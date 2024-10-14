import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        required:[true,"Email Required !!"],
        unique:true
    },
    password:String,
    about:String,
    profileURL:String
})

export const User = mongoose.models.users || mongoose.model("users",userSchema)   //Collections and Schema



/*
THEORY
To work with Data in MongoDB we have to crate models,..

TO create Models,.. first we have to create Schema

Schema is nothing but actual design of an Model

mongoose.model("users",userSchema)  ---   This statement convert Schema "userSchema" into Model,.. with collection name "users" 
mongoose.models.users ||            ----- this OR condition is used to check if previously model is present or not if present then we avoid creating
*/