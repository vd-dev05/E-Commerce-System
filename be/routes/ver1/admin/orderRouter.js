import express from "express"
import { getAllOrder, getOrderDetailsForAdmin, updateOrderStatus } from "../../../controllers/admin/orderController.js";

const adminOrderRouter = express.Router();

adminOrderRouter.get('/list', getAllOrder)
adminOrderRouter.get('/details/:id', getOrderDetailsForAdmin)
adminOrderRouter.put('/update/:id', updateOrderStatus)

export default adminOrderRouter