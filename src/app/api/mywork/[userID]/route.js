import connectDB from "@/helper/db";
import { Mywork } from "@/models/mywork";
import { NextResponse } from "next/server";

connectDB()

//API to create a new work
export async function POST(request,{params}){
    const {userID} = params
    const {title,description,deadline} =await request.json();
    try{
        const newwork = new Mywork({
            userid:userID,title:title,description,deadline
        })
        await newwork.save()
        return NextResponse.json({
            message:"Work Posted Successfully",
            success:true,
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message:"Work not posted",
            success:false,
        })
    }
}



//API to GET all work of a Particular User
export async function GET(request,{params}){
    const {userID} = params
    let works = []
    try{
        works = await Mywork.find({userid:userID})
        return NextResponse.json(works,{
            message:"Successfully fetched all data of a user",
            success:true
        })
    }
    catch(error){
        return NextResponse.json({
            message:"Faild to Fetch Work",
            success:false
        })
    }
}