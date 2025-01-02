import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../../../models/auth/userModel.js';

const register = async (req, res) => {
    const { username, email, password, gender, birthday, phone } = req.body;

    try {

        const hashPassword = await bcrypt.hash(password, 10);
        const formattedBirthday = new Intl.DateTimeFormat('en-GB').format(new Date(birthday))
        const newUser = new UserModel({
            username,
            email,
            gender,
            birthday: formattedBirthday,
            phone,
            password: hashPassword
        })
        await newUser.save()
        res.json({
            success: true,
            message: 'Đăng ký tài khoàn thành công'
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
    const { email, password } = req.body;

    try {

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: "Tài khoản Email không tồn tại"
            })
        }
        const passwordMath = await bcrypt.compare(password, user.password)
        if (!passwordMath) {
            return res.json({
                success: false,
                message: 'Mật khẩu không chính xác, vui lòng nhập lại'
            })
        };
        const token = jwt.sign({
            id: user._id,
            role: user.role,
            email: user.email,
            gender: user.gender,
            phone: user.phone,
            birthday: user.birthday,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: '60m' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: false
        }).json({
            success: true,
            message: 'Đăng nhập thành công',
            user: {
                id: user._id,
                role: user.role,
                email: user.email,
                gender: user.gender,
                phone: user.phone,
                birthday: user.birthday,
                username: user.username
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
        res.clearCookie('token').json({
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
        const user = req.user;
        res.json({
            success: true,
            message: 'Authenticated user !',
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
