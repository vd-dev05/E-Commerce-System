import express from "express";
import adminController from "../../../controllers/admin/adminController.js";
import adminMiddleware from "../../../middlewares/admin/adminMiddleware.js";

const adminRouter = express.Router();

adminRouter.post('/login',adminController.login)
adminRouter.get('/get-users',adminMiddleware.isAdmin, adminController.getUsers)
adminRouter.get('/trafic-users',adminMiddleware.isAdmin, adminController.traficUser)
adminRouter.get('/block-users',adminMiddleware.isAdmin, adminController.getBlockUser)
adminRouter.put('/unblock-user/:id',adminMiddleware.isAdmin, adminController.unBlockUser)
export default adminRouter