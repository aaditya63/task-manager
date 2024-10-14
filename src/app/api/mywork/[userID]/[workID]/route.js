import connectDB from "@/helper/db"
import { Mywork } from "@/models/mywork"
import { NextResponse } from "next/server"

connectDB()
//API to get Particular Work of a user
export async function GET(request,{params}){

    console.log("PARAMS is ",params.userID)
    
    try{
        let temp = await Mywork.findById("66dc28e8721dc3ec609765bf")
        return NextResponse.json(temp,{
            message:"Work Fetched Successfully",
            success:true
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message:"work not Fetched",
            success:false
        })
    }
}

//Update Work
export async function PUT(request,{params}){
    const {title,description,deadline} = await request.json()
    const {userID,workID} = params

    console.log(title," ",description," ",deadline)

    try{
        const work =await Mywork.findById(workID)
        work.title = title
        work.description = description
        work.deadline = deadline

        await work.save()

        return NextResponse.json(work,{
            message:"User is Updated Successfully",
            success:true
        })
    }catch(error){
        return NextResponse.json({
            message:"Failed to update User",
            success:false
        })
    }
}

//API to Delete work
export async function DELETE(request,{params}){
    const {userID,workID} = params
    try{
        await Mywork.deleteOne({
            _id:workID
        })
        return NextResponse.json({
            message:"Work is Deleted Successfully",
            success:true
        })
    }catch(error){
        return NextResponse.json({
            message:"Failed to Delete User",
            success:false
        })
    }
}