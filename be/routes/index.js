import express from "express";
import userRouter from './ver1/auth/authRoutes.js'
import manageRouter from "./ver1/manager/managerRoutes.js";
import usersRouter from "./ver1/user/userRoutes.js";



const RootRouter = express.Router();
// endpoints : http://{url}/api/v1 
RootRouter.use('/api/v1/auth', userRouter)
RootRouter.use('/api/v1/manager', manageRouter)
RootRouter.use('/api/v1/users',usersRouter)

export default RootRouter