import connectDB from "@/helper/db"
import { errorResposne } from "@/helper/returnResponse"
import { Task } from "@/models/task"
import { NextResponse } from "next/server"
import  jwt  from "jsonwebtoken"


//To get all Tasks
export async function GET(request){
    try{
        await connectDB()

        const tasks = await Task.find()
        return NextResponse.json(tasks)
    }catch(error){
        console.log(error)
        return errorResposne("Failed to Fetch",404,false)
    }
}


//API to create task
export async function POST(request,{params}){
    const {title,content,userId,status} = await request.json()
    //Fetching for User id
    const authToken = request.cookies.get("authToken")?.value;
    const data = jwt.verify(authToken,process.env.JWT_KEY)
    try{
        await connectDB()

        const newtask = new Task({
            title,content,userId:data._id,status
        })
        const createdt = await newtask.save()
        return NextResponse.json(createdt,{
            message:"Task Created Succesfully",
            success:true
        })
    }catch(error){
        console.log(error)
        return errorResposne("failed to create task!!",500,false)
    }
}