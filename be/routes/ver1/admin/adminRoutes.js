import express from "express";
import adminController from "../../../controllers/admin/adminController.js";
import adminMiddleware from "../../../middlewares/admin/adminMiddleware.js";
import Voucher from "../../../controllers/admin/voucher/index.js";
import { cacheTime } from "../../../config/index.js";

const adminRouter = express.Router();
adminRouter.get('/voucher/all', adminMiddleware.isAdmin,Voucher.getVoucherUserPromotion)
adminRouter.post('/voucher/create',adminMiddleware.isAdmin,Voucher.createVoucher)
adminRouter.post('/login',adminController.login)
adminRouter.get('/get-users',adminMiddleware.isAdmin, adminController.getUsers)
adminRouter.get('/trafic-users',adminMiddleware.isAdmin, adminController.traficUser)
adminRouter.get('/block-users',adminMiddleware.isAdmin, adminController.getBlockUser)
adminRouter.put('/unblock-user/:id',adminMiddleware.isAdmin, adminController.unBlockUser)
adminRouter.delete('/delete-user/:id',adminMiddleware.isAdmin, adminController.deleteUsers)
adminRouter.get('/test',adminMiddleware.isAdmin,adminController.getTraficDate)
adminRouter.put('/cacheUpdateTime', adminMiddleware.isAdmin,Voucher.updatetime)
adminRouter.get('/time/get', (req,res) => {
    res.status(200).json({success : true, message : "Get time successfully", timestamp : cacheTime.time || 70})
})

export default adminRouter