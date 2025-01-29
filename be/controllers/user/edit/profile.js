import UserModel from "../../../models/auth/userModel.js";

const EditProfile = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.user.id, req.body, { new: true });
        res.json({
            success: true,
            message: 'Cập nhập thông tin thành công',
            user:{
                username: user.username,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export default EditProfile
