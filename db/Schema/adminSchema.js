import { Schema,model } from "mongoose";


const adminSchema=Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    
    
   
    
    
    

})



const Admin=model("Admin",adminSchema)

export default Admin