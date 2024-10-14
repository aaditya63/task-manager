import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const authToken = request.cookies.get('authToken')?.value
    if(request.nextUrl.pathname === "/api/login" || request.nextUrl.pathname === "/api/users"){
        return
    }    
    
    const loggedInUserNotAccessPaths = request.nextUrl.pathname  === "/login" || request.nextUrl.pathname === "/signup"
    if(loggedInUserNotAccessPaths){
        //have key and accessing unsecured route
        if(authToken){
            return NextResponse.redirect(new URL("profile/user",request.url))
        }
    }
    else{
        //not have key and accessing secured route
        if(!authToken){

            if(request.nextUrl.pathname.startsWith("/api")){           //Also checking here and return error json instead of redirecting,.. it prevents on 1st time website loading
                return NextResponse.json({
                    message:"Access Denied!!",
                    success:false
                },{
                    status:401
                })
            }

            return NextResponse.redirect(new URL('/login',request.url))
        }else{
            //verify user
        }
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:["/login","/signup","/add-task","/show-task","/profile/:path*","/api/:path*"],
}



/*
to run on all paths of   matcher:'/api/:path*',
also we can pass a array,list of urls   matcher:['/', '/about', /api/:path*]'
*/