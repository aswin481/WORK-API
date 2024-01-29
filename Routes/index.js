import express from "express"
import adminroute from "./adminRoutes.js"
import userroute from "./userRoutes.js"
import supervisorroute from "./supervisorRoutes.js"


const router=express.Router()


router.use(adminroute)
router.use(userroute)
router.use(supervisorroute)










export default router