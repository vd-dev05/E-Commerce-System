import express from "express";
import CountDown from "../../../controllers/user/countdown/index.js";
import OrderController from "../../../controllers/user/card/orderControllers.js";
import { authMiddleware } from "../../../middlewares/authMiddleware.js";

const usersRouter = express.Router();

// usersRouter.post('/countdown/start',CountDown.getTimeStart)
// usersRouter.get('/countdown/end',CountDown.getTimeCountdownEndTime)

usersRouter.post('/products/add', authMiddleware ,OrderController.addOrder)
usersRouter.get('/products/get-order', authMiddleware ,OrderController.getOrder)

export default usersRouter