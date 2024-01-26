import express from "express"
import adminroute from "./adminRoutes.js"


const router=express.Router()


router.use(adminroute)









export default router