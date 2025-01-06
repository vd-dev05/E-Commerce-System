import express from "express";
import adminController from "../../../controllers/admin/adminController.js";
import adminMiddleware from "../../../middlewares/admin/adminMiddleware.js";

const adminRouter = express.Router();

adminRouter.post('/login',adminController.login)
adminRouter.get('/get-users',adminMiddleware.isAdmin, adminController.getUsers)

export default adminRouter