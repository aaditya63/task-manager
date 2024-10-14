import mongoose, { Schema } from "mongoose";

const workSchema = new Schema({
    userid:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    deadline:String,
})

export const Mywork = mongoose.models.myworks || mongoose.model('myworks',workSchema)