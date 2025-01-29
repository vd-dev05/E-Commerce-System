import { ErrorNotFoundResponse } from "../../../error/errorResponse.js"
import bcrypt from 'bcrypt'
import UserModel from "../../../models/auth/userModel.js"
import { UnauthorizedError } from "../../../error/user/userError.js"
const ChangePassword = async (req, res) => {
    try {

        
        const { password } = req.body
        
        if (!password) throw new UnauthorizedError("mat khau chua co")

        const user = await UserModel.findById(req.user.id)
        const checkPassword = await bcrypt.compare(password, user.password)
        
        if (!checkPassword) {
            throw new UnauthorizedError("mat khau cu khong dung")
        }

        res.status(200).json({success : true ,message:"Mat khau dung"})
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