import express from "express";
import userRouter from './ver1/auth/authRoutes.js'
import manageRouter from "./ver1/manager/managerRoutes.js";



const RootRouter = express.Router();
// endpoints : http://{url}/api/v1 
RootRouter.use('/api/v1/auth', userRouter)
RootRouter.use('/api/v1/manager', manageRouter)
export default RootRouter