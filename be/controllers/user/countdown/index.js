import { TimeOutErrorResponse } from "../../../error/errorResponse.js";
import { TimeOutError } from "../../../error/user/userError.js";
import  countdownService from "../../../services/countdownService.js";

const CountDown = {

    getTimeStart: async (req, res) => {

        try {
            countdownStartTime = Date.now();
            countdownEndTime = countdownStartTime + 1 * 60 * 60 * 1000;

            res.json({ message: 'Countdown started', countdownEndTime });
        } catch (error) {
            TimeOutErrorResponse(res, error)
        }
    },
    getTimeCountdownEndTime: async (req, res) => {
        try {
            if (!countdownEndTime) {
                throw new TimeOutError('Countdown not started');
            }

            const timeLeft = countdownEndTime - Date.now();

            if (timeLeft <= 0) {
                return res.json({ timeLeft: 0 });
            }

             res.json({ timeLeft });
        } catch (error) {
            TimeOutErrorResponse(res, error)
        }
    },
    handleSocketConnection : (socket) => {
        console.log('A client connected');
        countdownService.startCountdown(socket);
    }
}

export default CountDown;