import { ErrorNotFoundResponse } from "../../../error/errorResponse.js"
import bcrypt from 'bcrypt'
import UserModel from "../../../models/auth/userModel.js"
import { UnauthorizedError } from "../../../error/user/userError.js"
const ChangePassword = async (req, res) => {
    try {

        // console.log(req.body);
        

        // res.status(200).json({success : true ,message:"Mat khau dung"})
    } catch (error) {
        res.status(403).json({success : false ,message:error.message})
    }
}
const EditPassword = async (req, res) => {
    try {
        const user = req.user
        const { newPassword } = req.body
        const hashPassword = await bcrypt.hash(newPassword, 10)
        const userModel = await UserModel.findByIdAndUpdate(user.id, { password: hashPassword })
        if (userModel) {
            res.json({
                success: true,
                message: 'Doi mat khau thanh cong'
            })
        }

    } catch (error) {
        ErrorNotFoundResponse(res, error, 404)
    }
}
export {
    ChangePassword,
    EditPassword
}  