import { User } from "@/models/user"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import connectDB from "@/helper/db"

export async function POST(request){
    const {email,password} = await request.json()
    try{
        await connectDB()

        const user = await User.findOne({
            email
        })
        //1.Check user if exists
        if(user == null){               
            throw new Error("User not found")
        }

        //2.Validation
        const ismatch = bcrypt.compareSync(password,user.password)
        if(!ismatch){              
            throw new Error("Incorrect Password")
        }

        //3.Token Creation
        const token = jwt.sign({
            _id:user.id,
            name:user.name
        },process.env.JWT_KEY)

        //4.Sending Token to user via Cookies/Header,. we are going with cookies
        const response = NextResponse.json({
            message:"Login Successful",
            success:true,
            user:user
        })
        response.cookies.set("authToken",token,{
            expiresIn:"1d"
            // httpOnly:false 
        })
        return response

    }catch(error){
        console.log(error)
        return NextResponse.json({
            message:error.message,
            success:false
        },{
            status:500
        })
    }
}