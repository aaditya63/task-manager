import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    addedDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    status:{
        type:String,
        enum:["pending","completed"],         //Value is only between enum Options
        default:"pending"
    },
    userId:{
        type:mongoose.ObjectId,                 //Special Data type in mongoose that convays it contains object id of another data in mongoose
        required:true
    }
})

export const Task = mongoose.models.task || mongoose.model("task",TaskSchema)