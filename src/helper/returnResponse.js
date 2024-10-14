import { NextResponse } from "next/server"

export const errorResposne = (msg,statuscode,successcode)=>{
    return NextResponse.json({
        message:msg,
        success:successcode
    },{
        status:statuscode
    })
}