import express from "express";
import { login, register, logout, checkAuth } from "../../controllers/auth/authController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/logout', logout)
userRouter.get('/check-auth', authMiddleware, checkAuth)

export default userRouter