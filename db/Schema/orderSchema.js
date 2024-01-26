import { Schema,model } from "mongoose";


const orderSchema=Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[{
        productId:{
        type:Schema.Types.ObjectId,
        ref:"Products",
        required:true
        },
        quantity:{
            type:Number,
            required:true
        }

    }],
    totalPrice:{
        type:Number,
        required:true
    },
    totalQuantity:{
        type:Number,
        required:true
    },
    cancellable:{
        type:Boolean,
       
    },
    status:{
        type:String,
        default:"Pending"
       
    },
    isDeleted:{
        type:Boolean,
        default:false
       
    }
})


const Order=model("Order",orderSchema)


export default Order