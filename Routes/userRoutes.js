import express from "express"
import User from "../db/Schema/userSchema.js"
import Product from "../db/Schema/productSchema.js"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"


const router=express.Router()



router.post("/user/signup",async(req,res)=>{
    try{
    const body =req.body
    console.log(req.body)

    const user=await Admin.findOne({username:body.username})
    if(user){
       return res.status(403).json({message:"Username already taken"})
    }
    if(body.password!= body.confirmpassword){
       return res.status(403).json({message:"Password dont match"})
    }
    const hashedPassword=await bcrypt.hash(body.password,2)
   body.password=hashedPassword
  
  await User.create(body) 

   res.status(201).json({message:"User SignedUp Succesfully"})


    
    }

    catch(e){
        res.status(500).json({error:e.message})
    }

})
router.post("/user/login",async(req,res)=>{
    try{
        const body =req.body
        const user=await User.findOne({username:body.username})
       
        if(!user){
            res.status(401).json({message:"Username or Password Incorrect"})
        }
        const isMatching=await bcrypt.compare(body.password,admin.password)
        if(!isMatching){
            res.status(401).json({message:"Username or Password Incorrect"})
        }

        const token=jwt.sign({id:user._id, role:'USER'},"uyuyfututdtesuytthjgghgyrdyrd@7",{expiresIn:"7d"})

        res.status(200).json({message:"Login Sucess",token:token,id:user._id})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
})





export default router