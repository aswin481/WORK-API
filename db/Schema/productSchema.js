import { Schema,model } from "mongoose";


const productSchema=Schema({
    Name:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    TotalPrice:{
        type:Number,
        required:true
    },
    Paid:{
        type:Number,
        required:true
    },
    Refund:{
        type:Number,
       
    }
})


const Product=model("Product",productSchema)


export default Product