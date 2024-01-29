import { Schema,model } from "mongoose";


const supervisorSchema=Schema({
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
    
    
   
    
    
    

})



const Supervisor=model("Supervisor",supervisorSchema)

export default Supervisor