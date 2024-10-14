import mongoose from "mongoose";

import { User } from "../models/user";
const config={
    isConnected : 0
}
export default async function connectDB(){
    if(config.isConnected){
        return;
    }
    try{
        const {connection} = await mongoose.connect(process.env.MONGO_DB_URL,{
            dbName:"work_manager"
        })
        console.log("DB Connected");
        // console.log(connection.readyState)
        config.isConnected=connection.readyState

    }catch(error){
        console.log("Failed to Connect with Database");
    }
}