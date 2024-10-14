import connectDB from "@/helper/db"
import { errorResposne } from "@/helper/returnResponse"
import { Task } from "@/models/task"
import { NextResponse } from "next/server"


export async function GET(request,{params}){
    const {userID} = params
    let tasks = []
    try{
        await connectDB()

        tasks = await Task.find({userId:userID})
        return NextResponse.json(tasks)
    }catch(error){
        console.log(error)
        return errorResposne("Failed to get Tasks",404,false)
    }
}