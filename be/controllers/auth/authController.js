import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../../models/userModel.js';

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.json({
                success: false,
                message: 'Please fill all the inputs.'
            })
        }
        const userExists = await UserModel.findOne({ email })
        if (userExists) {
            return res.json({
                success: false,
                message: "Email already exists"
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username,
            email,
            password: hashPassword
        })
        await newUser.save()
        res.json({
            success: true,
            message: 'Registration successful'
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
                message: "User doesn't exists"
            })
        }
        const passwordMath = await bcrypt.compare(password, user.password)
        if (!passwordMath) {
            return res.json({
                success: false,
                message: 'Incorret password, please enter again'
            })
        };
        const token = jwt.sign({
            id: user._id,
            role: user.role,
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: '60m' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: false
        }).json({
            success: true,
            message: 'Logged in successfully',
            user: {
                email: user.email,
                role: user.role,
                id: user._id,
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
            message: "'Logged out successfully!"
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
