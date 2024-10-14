import connectDB from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
//API to Get a User
export async function GET(request,{params}){
    const {userID} = params;
    try{
        await connectDB()

        const user = await User.findById(userID);
        return NextResponse.json(user);
    }catch(error){
        return NextResponse.json({
            message:"Error in finding User"
        });
    }
}


//API to Delete a User
export async function DELETE(request,{params}){
    const {userID} = params;
    try{
        await connectDB()

        await User.deleteOne({
            _id:userID
        })
        return NextResponse.json({
            message:"User Successfully Deleted",
            success:true
        })
    }catch(error){
        return NextResponse.json({
            message:"ERROR !!, User is Not Deleted",
            success:false
        })
    }
}



//Update a User
export async function PUT(request,{params}){

    const {userID} = params
    const {name,password,about,profileURL} = await request.json()
    try{
        const user = await User.findById(userID);
        user.name = name;
        user.about = about;
        user.password = password;

        await user.save();

        return NextResponse.json({
            message:"User is Updated Successful",
            success:true
        })
    }catch(error){
        NextResponse.json({
            message:"Failed to Update User",
            success:"False"
        })
    }
}