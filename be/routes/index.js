import express from "express";
import userRouter from './ver1/auth/authRoutes.js'



const RootRouter = express.Router();
// endpoints : http://{url}/api/v1 
RootRouter.use('/api/v1/auth', userRouter)

export default RootRouter