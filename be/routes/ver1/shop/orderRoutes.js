import express from "express";
import { capturePayment, createOrder, getAllOrderByUser, getOrderDetails } from "../../controllers/shop/orderController.js";

const orderRouter = express.Router();

orderRouter.post('/add', createOrder)
orderRouter.post('/capture', capturePayment)
orderRouter.get('/list/:userId', getAllOrderByUser)
orderRouter.get('/details/:id', getOrderDetails)

export default orderRouter