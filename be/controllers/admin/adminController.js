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
            }, process.env.JWT_SECRET_ADMIN);
            if (!token) {
                throw new UnauthorizedError("Invalid token");
            }
            if (token) {
                res.cookie("admin_token", token, {
                    httpOnly: true,
                    secure: true,
                }).json({
                    success: true,
                    message: "Admin logged in successfully",
                });
            }            
        } catch (error) {
            ErrorNotFoundResponse(res, error.message = "Login failed");
        }
    
    },
    getUsers: async (req, res) => {
       try {
        const {page = 1 , limit = 10} = req.query; 

        const totalItems = await UserModel.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);
        const skip = (page - 1) * limit;

        const users = await UserModel.find()
        .skip(skip)
        .limit(limit)
        .select('-__v  -updatedAt -password') ;
        
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
        ErrorNotFoundResponse(res, error.message = "Get all users failed");
       }
    },
    traficUser : async (req,res) => {
        try {
           
                const users = await UserModel.find({})
                .select('-__v  -updatedAt -password -phone -email  -birthday  -username -gender');
                console.log(users);
                
                const data = {
                    total: users.length,
                    block_user : users.filter(user => user.isBlocked === true).length,
                    newUser : users.filter(user => user.createdAt >= Date.now() - 24 * 60 * 60 * 1000).length
                }
                
                res.status(200).json({
                    success: true,
                    message: "Get all trafi users successfully",
                    data: data,
                    timestamp: new Date().toISOString()
                });
        } catch (error) {
            // ErrorNotFoundResponse(res, error.message = "Get Trafic users failed");
        }
    }
}

export default adminController;