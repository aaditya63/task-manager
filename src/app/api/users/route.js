import { NextResponse } from "next/server";
import connectDB from "@/helper/db";
import { User } from "@/models/user";
import bcrypt from "bcryptjs"

export async function GET(){
    let users=[]
    try{
        await connectDB()

        users = await User.find().select("-password")              //If Black it returns all documents inside collection
    }catch(error){
        console.log(error);
        return NextResponse.json({
            Message:"Error Occured"
        })
    }
    return NextResponse.json(users);
}

//API for Creating User
export async function POST(request){
    const {name,email,password,about,profileURL} = await request.json()
    
    const newuser = new User({
        name,email,password,about,profileURL
    })
    console.log(newuser.password)
    try {
        await connectDB()

        newuser.password = bcrypt.hashSync(newuser.password, parseInt(process.env.BCRYPT_SALT))
        await newuser.save();
        console.log(newuser)  //Printing USer
        const response = NextResponse.json(newuser,{
                status:201
        });
        return response;
    }catch(error){
        console.log(error)
        const response = NextResponse.json({
            message:"Failed to Create User",
            status:false
        },{
            status:500
        });
        return response;
    }
}

