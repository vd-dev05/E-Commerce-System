import express from "express";
import CountDown from "../../../controllers/user/countdown/index.js";
import OrderController from "../../../controllers/user/card/orderControllers.js";
import { authMiddleware } from "../../../middlewares/authMiddleware.js";
import { uploadUser } from "../../../config/cloundAvartar.js";
import AvartarController from "../../../controllers/user/edit/avartar.js";

const usersRouter = express.Router();

// usersRouter.post('/countdown/start',CountDown.getTimeStart)
// usersRouter.get('/countdown/end',CountDown.getTimeCountdownEndTime)

usersRouter.post('/products/add', authMiddleware ,OrderController.addOrder)
usersRouter.get('/products/get-order', authMiddleware ,OrderController.getOrder)
usersRouter.post('/file-upload',uploadUser.single('avatar'),AvartarController)
usersRouter.post('/', (req,res) => { console.log("tets");
} )


export default usersRouter