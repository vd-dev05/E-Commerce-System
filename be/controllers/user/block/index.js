import { ErrorNotFoundResponse } from "../../../error/errorResponse.js"
import UserModel from "../../../models/auth/userModel.js";

const BlockUser = {
    getCountBlockUser : async (req,res) => {
        try {
            const users = await UserModel.find({ _id : req.user.id})
            .select('countBlock');
            res.status(200).json({success : true, message : "Get block user successfully", count: users[0].countBlock, timestamp : new Date().toISOString()})
        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    }
}
export default BlockUser