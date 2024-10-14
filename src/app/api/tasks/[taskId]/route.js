//../api/task/taskId

import connectDB from "@/helper/db"
import { errorResposne } from "@/helper/returnResponse"
import { Task } from "@/models/task"
import { NextResponse } from "next/server"


export async function GET(request,{params}){
    const {taskId} = params
    try{
        await connectDB()

        const tasks =await Task.findById(taskId)
        return NextResponse.json(tasks)
    }catch(error){
        return errorResposne("Error Occurred",404,false)
    }
}


export async function PUT(request,{params}){
    const {taskId} = params
    const {title,content,status} = await request.json()
    try{
        await connectDB()

        let task = await Task.findById(taskId)
        task.title = title
        task.content = content
        task.status = status
        const newtask = await task.save()
        return NextResponse.json(newtask,{
            message:"Task updated Successfully",
            success:true
        })
    }catch(error){
        return errorResposne("Error! Task is not Updated",500,false)
    }
}

export async function DELETE(request,{params}){
    const {taskId} = params
    try{
        await connectDB()

        await Task.deleteOne({_id:taskId})
        return NextResponse.json({
            message:"Message is Successfully Deleted",
            success:true
        })
    }catch(error){
        console.log(error)
        return errorResposne("Error Occurred, Message is not Deleted",500,false)
    }
}
