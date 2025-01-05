import jwt from "jsonwebtoken";
import { ErrorNotFoundResponse } from "../../error/errorResponse.js";
import { UnauthorizedError } from "../../error/admin/adminError.js";
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
            }, process.env.JWT_SECRET, { expiresIn: "60m" });
            if (!token) {
                throw new UnauthorizedError("Invalid token");
            }
            res.cookie("admin_token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            }).json({
                success: true,
                message: "Admin logged in successfully",
            });
            
        } catch (error) {
            ErrorNotFoundResponse(res, error);
        }
    
    },
    getUsers: (req, res) => {
        res.json({ message: "Get all users" });
    },
}

export default adminController;