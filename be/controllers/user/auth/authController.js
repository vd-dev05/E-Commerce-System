import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../../../models/auth/userModel.js';
import responseServer from '../../../services/configStatus.js';

const register = async (req, res) => {
    const { username, email, password, gender, birthday, phone ,isLoginGoogle, isPasswordSet } = req.body;

    try {
        if (isLoginGoogle === false) {
           
            const hashPassword = await bcrypt.hash(password, 10);
            const formattedBirthday = new Intl.DateTimeFormat('en-GB').format(new Date(birthday))
            const newUser = new UserModel({
                username,
                email,
                gender,
                birthday: formattedBirthday,
                phone : Number(phone),
                password: hashPassword,
                isActive: true,
                last_login: Date.now(),
                role: 'user',
                is_temporary: false,
                isPasswordSet : isPasswordSet  ,
                isLoginGoogle : isLoginGoogle,
            })
            await newUser.save()
            res.json({
                success: true,
                message: 'Đăng ký tài khoàn thành công'
            })
        } else if (isLoginGoogle === true) {
            const data = {
                username,
                email,
                gender,
                phone,
                role: 'user',
                isActive: true,
                last_login: Date.now(),
                is_temporary: false,
                isPasswordSet : isPasswordSet ,
                isLoginGoogle : isLoginGoogle,
                googleId : req.body.googleId,
                avartar : req.body.avartar,

            }
        const newUser = new UserModel(data)
        await newUser.save()
        if (newUser) {
            const token = jwt.sign({
                id: newUser._id,
                role: newUser.role,
                email: newUser.email,
                gender: newUser.gender || '' ,
                phone: newUser.phone || '',
                birthday: newUser.birthday || '',
                username: newUser.username,
                last_login : Date.now(),
                isLoginGoogle : isLoginGoogle,
                googleId : newUser.googleId,
                avartar : newUser.avartar,
            }, process.env.JWT_SECRET);  
           
            
            res.cookie('token', token, {
                httpOnly: true,
                // secure: false,
                secure: true,
                domain: process.env.BASE_URL_DEPLOY,
                sameSite: 'None',
                path: '/'
            }).json({
                success: true,
                message: 'Đăng ký tài khoản thành công'
            })
        }}
        
        else  {
            res.status(403).json({
                success: false,
                message: "Vui lý đăng ký tài khoản trên trang web. Sai phương thức đăng kí"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}
const login = async (req, res , next) => {
    const { email, password , isLoginGoogle } = req.body;
    try {

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.json({
                success: false,
                message: "Tài khoản Email không tồn tại"
            })
        }
        if (user?.countBlock >  3 || user?.isBlocked === true) {
            user.isBlocked = true
            await user.save()
            return res.json({
                success: false,
                message: "Tài khoản bị block "
            })
        }
        
        if (isLoginGoogle !== true) {
            const passwordMath = await bcrypt.compare(password, user.password)
            if (!passwordMath) {
                return res.json({
                    success: false,
                    message: 'Mật khẩu không chính xác, vui lòng nhập lại'
                })
            };
        }
       
      
        user.last_login = Date.now()
        await user.save()
        
        const token = jwt.sign({
            id: user._id,
            role: user.role,
            email: user.email,
            gender: user.gender,
            phone: user.phone,
            birthday: user.birthday,
            username: user.username,
            last_login : Date.now(),
            coin : user.coin,
            avartar : user?.avartar || null,
        }, process.env.JWT_SECRET)
        
        res.cookie('token', token , {
            httpOnly: true,
            secure: true,
            domain: process.env.BASE_URL_DEPLOY,
            sameSite: 'None',
            path: '/'
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
                username: user.username,
                avartar : user?.avartar || null,
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
        res.status(responseServer.STATUS.SUCCESS).json({
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
