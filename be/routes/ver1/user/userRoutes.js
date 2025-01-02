import express from "express";
import CountDown from "../../../controllers/user/countdown/index.js";

const usersRouter = express.Router();

usersRouter.post('/countdown/start',CountDown.getTimeStart)
usersRouter.get('/countdown/end',CountDown.getTimeCountdownEndTime)

export default usersRouter