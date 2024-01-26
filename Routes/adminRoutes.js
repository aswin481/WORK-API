import express from "express"
import Admin from "../db/Schema/adminSchema.js"
import Product from "../db/Schema/productSchema.js"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"


const router=express.Router()



router.post("/admin/signup",async(req,res)=>{
    try{
    const body =req.body
    console.log(req.body)

    const admin=await Admin.findOne({username:body.username})
    if(admin){
       return res.status(403).json({message:"Username already taken"})
    }
    if(body.password!= body.confirmpassword){
       return res.status(403).json({message:"Password dont match"})
    }
    const hashedPassword=await bcrypt.hash(body.password,2)
   body.password=hashedPassword
  
  await Admin.create(body) 

   res.status(201).json({message:"Admin SignedUp Succesfully"})


    
    }

    catch(e){
        res.status(500).json({error:e.message})
    }

})
router.post("/admin/login",async(req,res)=>{
    try{
        const body =req.body
        const admin=await Admin.findOne({username:body.username})
       
        if(!admin){
            res.status(401).json({message:"Username or Password Incorrect"})
        }
        const isMatching=await bcrypt.compare(body.password,admin.password)
        if(!isMatching){
            res.status(401).json({message:"Username or Password Incorrect"})
        }

        const token=jwt.sign({id:admin._id, role:'ADMIN'},"uyuyfututdtesuytthjgghgyrdyrd@78",{expiresIn:"7d"})

        res.status(200).json({message:"Login Sucess",token:token,id:admin._id})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
})

router.post("/admin/addproducts",async(req,res)=>{
        try{ 
            
            const body =req.body


       const response= await Product.create(body)
       console.log(response)
        
            res.status(200).json({message:"Product Created",id:response._id})
        
        }
        catch(e){
            res.status(500).json({error:e.message})
        }
})
router.get("/admin/getproducts",async(req,res)=>{
    try{ 
        
        


    const Products=await Product.find()
    
        res.status(200).json(Products)
    
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
})
router.get("/admin/getproducts/:id",async(req,res)=>{
    try{ 
        
        const id=req.params.id


    const Products=await Product.findById(id)
    
        res.status(200).json(Products)
    
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
})
router.delete("/admin/deleteproducts/:id",async(req,res)=>{
    try{ 
        
        const id=req.params.id


    await Product.findByIdAndDelete(id)
    
        res.status(200).json({message:"Product Deleted"})
    
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
})
router.patch("/admin/updateproducts/:id",async(req,res)=>{
    try{ 
        
        const id=req.params.id
        const data=req.body


   const updatedData= await Product.findByIdAndUpdate(id,data)
   console.log(updatedData)
    
        res.status(200).json({message:"Updated"})
    
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
})





export default router