import express from"express"
import mongoose from "./db/index.js"
import router from "./Routes/index.js"
import cors from "cors"




const app=express()
app.use(cors())

app.use(express.json())

app.use(router)



app.use("*",(req,res)=>{
res.send("No Route Found")
})




app.listen(3000,()=>{
    console.log("listening")
})