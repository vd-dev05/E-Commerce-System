import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ManagerModel from '../../../models/shop/managerModel.js';


const register = async (req, res) => {
    const { manager_name, email, password, phone, logo } = req.body;

    try {

        const hashPassword = await bcrypt.hash(password, 10);
        const newManager = new ManagerModel({
            manager_name,
            email,
            phone,
            password: hashPassword,
            logo: logo === "" ? null : logo
        })
        await newManager.save()
        res.json({
            success: true,
            message: 'Đăng ký nhà bán hàng thành công'
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const login = async (req, res) => {
    const { email, phone, password } = req.body;

    try {

        const manager = await ManagerModel.findOne({
            $or: [{ email }, { phone }]
        })

        if (manager) {
            return res.json({
                success: false,
                message: "Tài khoản không tồn tại"
            })
        }
        const passwordMath = await bcrypt.compare(password, manager.password)
        if (!passwordMath) {
            return res.json({
                success: false,
                message: 'Mật khẩu không chính xác, vui lòng nhập lại'
            })
        };
        const token = jwt.sign({
            id: manager._id,
            role: manager.role,
            email: manager.email,
            phone: manager.phone,
            manager_name: manager.manager_name
        }, process.env.JWT_SECRET, { expiresIn: '60m' })

        res.cookie('manager_token', token, {
            httpOnly: true,
            secure: false
        }).json({
            success: true,
            message: 'Đăng nhập thành công',
            manager: {
                id: manager._id,
                role: manager.role,
                email: manager.email,
                phone: manager.phone,
                manager_name: manager.manager_name
            }
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie('manager_token').json({
            success: true,
            message: "Đăng xuất thành công"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const checkAuth = (req, res) => {
    try {
        const manager = req.manager;
        res.json({
            success: true,
            message: 'Authenticated manager !',
            user
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { register, login, logout, checkAuth }


