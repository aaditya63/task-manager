import { Mywork } from "@/models/mywork"
import { NextResponse } from "next/server"


//API to Get all Works
export async function GET(){
    let work = []
    try{
        work = await Mywork.find()
        return NextResponse.json(work,{
            message:"Data Fetch Successful",
            success:true
        })
    }catch(error){
        return NextResponse.json({
            message:"Failed to Fetch Resources",
            success:Failed
        })
    }

}