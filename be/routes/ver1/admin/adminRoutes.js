import express from "express";
import adminController from "../../../controllers/admin/adminController.js";
import adminMiddleware from "../../../middlewares/admin/adminMiddleware.js";

const adminRouter = express.Router();

adminRouter.get('/get-users',adminMiddleware.isAdmin, adminController.getUsers)
adminRouter.post('/login',adminController.login)

export default adminRouter