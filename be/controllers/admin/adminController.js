import jwt from "jsonwebtoken";
import { ErrorNotFoundResponse } from "../../error/errorResponse.js";
import { UnauthorizedError } from "../../error/admin/adminError.js";
import UserModel from '../../models/auth/userModel.js'
import dotenv from "dotenv";
dotenv.config();

const adminController = {
    login: (req, res) => {
        try {
            const { user, password } = req.body;
            if (user !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASSWORD) {
                throw new  UnauthorizedError("Invalid credentials");
            } 

            const token = jwt.sign({
                role: "admin",
                id: 'admin-ecom'
            }, process.env.JWT_SECRET_ADMIN, { expiresIn: "60m" });
            if (!token) {
                throw new UnauthorizedError("Invalid token");
            }
            if (token) {
                res.cookie("admin_token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge : 900000
                }).json({
                    success: true,
                    message: "Admin logged in successfully",
                });
            }            
        } catch (error) {
            ErrorNotFoundResponse(res, error);
        }
    
    },
    getUsers: async (req, res) => {
        const {page = 1 , limit = 10} = req.query;
       try {
        const totalItems = await UserModel.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);
        const skip = (page - 1) * limit;

        const users = await UserModel.find().skip(skip).limit(limit);
        
        res.json({
            success: true,
            message: "Get all users successfully",
            data: {
                users,
                totalItems,
                totalPages,
                currentPage: page
            }
        });

       } catch (error) {
        
       }
    },
}

export default adminController;