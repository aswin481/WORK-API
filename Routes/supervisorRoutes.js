import express from "express"
import Supervisor from "../db/Schema/supervisorSchema.js"
import Product from "../db/Schema/productSchema.js"

import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"
import Order from "../db/Schema/orderSchema.js"


const router=express.Router()



router.post("/supervisor/signup",async(req,res)=>{
    try{
    const body =req.body
    console.log(req.body)

    const supervisor=await Supervisor.findOne({username:body.username})
    if(supervisor){
       return res.status(403).json({message:"Username already taken"})
    }
    if(body.password!= body.confirmpassword){
       return res.status(403).json({message:"Password dont match"})
    }
    const hashedPassword=await bcrypt.hash(body.password,2)
   body.password=hashedPassword
  
  await Supervisor.create(body) 

   res.status(201).json({message:"Supervisor SignedUp Succesfully"})


    
    }

    catch(e){
        res.status(500).json({error:e.message})
    }

})
router.post("/supervisor/login",async(req,res)=>{
    try{
        const body =req.body
        const supervisor=await Supervisor.findOne({username:body.username})
       
        if(!supervisor){
            res.status(401).json({message:"Username or Password Incorrect"})
        }
        const isMatching=await bcrypt.compare(body.password,supervisor.password)
        if(!isMatching){
            res.status(401).json({message:"Username or Password Incorrect"})
        }

        const token=jwt.sign({id:admin._id, role:'SUPERVISOR'},"uyuyfututdtesuytthjgghgyrdyrd@",{expiresIn:"7d"})

        res.status(200).json({message:"Login Sucess",token:token,id:supervisor._id})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
})



router.post("/supervisor/order",async(req,res)=>{

    try{
    const {items}=req.body
    let totalPrice = 0;
      let totalQuantity = 0;
      for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(400).json({ message: 'Product not found' });
        }
        totalPrice += product.TotalPrice * item.quantity;
        totalQuantity += item.quantity;
        const order = new Order({
            userId: req.body.userId,
            items,
            totalPrice,
            totalQuantity,
            status: 'pending',
            cancellable: true,
            isDeleted: false,
          });
    
          await order.save();
          res.send(order)
      }
      
    }
    catch(e){
        res.status(500).json({error:e.message})

    }

})
router.put('/edit/order/:id', async (req, res) => {
    try {
      const  id  = req.params.id;
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
     
      await Order.findByIdAndUpdate(id, req.body);
      res.json({ message: 'Order updated successfully' });
    } catch (e) {
      
      res.status(500).json({error:e.message})
    }
  });
  router.delete('/cancel/order/:id', async (req, res) => {
    try {
      const id  = req.params.id;
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      await Order.findByIdAndDelete(id);
      res.json({ message: 'Order cancelled successfully' });
    } catch (e) {
      res.status(500).json({error:e.message})
    }
  });
  router.post('/order/payment/:id', async (req, res) => {
    try {
      const id  = req.params.id;
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      order.status = 'paid';
      await order.save();
      res.json({ message: 'Payment successful' });
    } catch (e) {
      console.error(err.message);
      res.status(500).json({error:e.message});
    }
  });

export default router