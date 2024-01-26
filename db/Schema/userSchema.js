import { Schema,model } from "mongoose";


const userSchema=Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true,
    },
    assignTable:{
        type:String,
        required:true
    },
    
   
    
    
    

})



const User=model("User",userSchema)

export default User