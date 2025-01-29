import { ErrorNotFoundResponse } from "../../../error/errorResponse.js";
import Transition from "../../../models/shop/transitionModels.js"

const TransitionsController = {
    getTransition : async (req, res) => {
        try {
            const transitions = await Transition.find({ userId: req.user.id }).sort({ createdAt: -1 }).select('-userId -_id')
            res.status(200).json({
                success: true,
                transitions : transitions
            })
        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    }
}

export default TransitionsController