import mongoose from "mongoose";


const userSchema=new mongoose.Schema({

    fname:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    mobile:{type:String,required:true,trim:true},
    password:{type:String,required:true,trim:true}

})

//model

const UserModel=mongoose.model("user",userSchema)

export default UserModel