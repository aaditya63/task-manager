import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { User } from "@/models/user";
import connectDB from "@/helper/db";


export async function GET(request){
    await connectDB()

    const authToken = request.cookies.get("authToken")?.value;
    if(!authToken){
        return NextResponse.json({
            message:"user is not logged in!!"
        })
    }
    const data = jwt.verify(authToken,process.env.JWT_KEY)
    const curr_user = await User.findById(data._id).select("-password")
    console.log("Fetched Successfully")
    return NextResponse.json(curr_user)
}