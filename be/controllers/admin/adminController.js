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
                    domain: process.env.BASE_URL_DEPLOY,
                    sameSite: 'None',
                    path: '/'
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

        const users = await UserModel.find({isActive : true})
        .skip(skip)
        .limit(limit)
        .select('-__v  -updatedAt -password') 
        
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
            ErrorNotFoundResponse(res, error.message = "Get Trafic users failed");
        }
    },
    getBlockUser : async (req,res) => {
        try {
            const {page = 1 , limit = 10} = req.query; 

            const totalItems = await UserModel.countDocuments({isBlocked : true});
            const totalPages = Math.ceil(totalItems / limit);
            const skip = (page - 1) * limit;

            const users = await UserModel.find({isBlocked : true})
            .skip(skip)
            .limit(limit)
            // .select('');
            
            res.status(200).json({
                success: true,
                message: "Get all block users successfully",
                data: {
                    users,
                    totalItems,
                    totalPages,
                    currentPage: page
                },
                timestamp: new Date().toISOString()
            }); 
        } catch (error) {
            ErrorNotFoundResponse(res, error.message = "Get all block users failed");
        }
    },
    unBlockUser : async (req,res) => {
        try {
            const {id} = req.params;
            const user = await UserModel.findByIdAndUpdate(id,{isBlocked : false});
            res.status(200).json({
                success: true,
                message: "Unblock user successfully",
                data: user,
                timestamp: new Date().toISOString()
            }); 
        } catch (error) {
            ErrorNotFoundResponse(res, error.message = "Unblock user failed");
        }
    },
    deleteUsers : async (req,res) => {
        try {
            const {id} = req.params;
            const user = await UserModel.findByIdAndUpdate(id,{
                isActive : false,
                deleteCount : Date.now() + 30 * 24 * 60 * 60 * 1000
            });
            res.status(200).json({
                success: true,
                message: "Delete user successfully",
                data: user,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            ErrorNotFoundResponse(res, error.message = "Delete users failed");
        }
    },
    getTraficDate : async (req,res) => {
        try {
            const now = new Date();
            const twelveMonthsAgo = new Date(now.setMonth(now.getMonth() - 12));
       
            const data = await UserModel.aggregate([
                {
                  $match: {
                    createdAt: { $gte: twelveMonthsAgo } // Lọc người dùng đã đăng ký trong 12 tháng qua
                  }
                },
                {
                  $project: {
                    username: 1,
                    email: 1,
                    createdAt: 1,  // Trích xuất ngày tạo tài khoản
                    month: { $month: "$createdAt" }, // Trích xuất tháng từ trường `createdAt`
                    year: { $year: "$createdAt" },   // Trích xuất năm từ trường `createdAt`
                    isBlocked: 1, // Thông tin về người dùng bị khóa
                  }
                },
                {
                  $group: {
                    _id: { month: "$month", year: "$year" }, // Nhóm theo tháng và năm
                    newUserCount: { $sum: 1 },  // Đếm số lượng người dùng mới trong tháng đó
                    violationUserCount: { $sum: { $cond: [{ $eq: ["$isBlocked", true] }, 1, 0] } }, // Đếm số người dùng bị khóa
                  }
                },
                {
                  $sort: { "_id.year": -1, "_id.month": -1 } // Sắp xếp theo tháng gần nhất
                },
                {
                  $limit: 12 // Giới hạn chỉ lấy dữ liệu của 12 tháng
                }
              ]).exec();

            const totalUserCount = await UserModel.countDocuments({ createdAt: { $gte: twelveMonthsAgo } });

            res.status(200).json({
                success: true,
                message: "Get trafic date successfully",
                data: { monthlyData: data.reverse(), totalUserCount },
                timestamp: new Date().toISOString()
            })
        } catch (error) {
            ErrorNotFoundResponse(res, error.message = "Get trafic date failed");
        }
    }
  
}

export default adminController;