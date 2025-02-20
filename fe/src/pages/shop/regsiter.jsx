import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { registerUser } from '@/store/Shop/auth'
import { Facebook, } from 'lucide-react'
import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { useFormik } from 'formik';
import { userSchemaSignInRegister } from '@/validations/Yup/useYupForm';
import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import app from '@/services/firebase/config'

const ShoppingRegsiter = () => {

    // const [formData, setFormData] = useState({
    //     username: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: '',
    //     gender: 'Male',
    //     birthday: '',
    //     phone: ''
    // })
    const [type, setType] = useState('password')
    const { toast } = useToast()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            phone: '',
            birthday: '',
            gender: 'Male',
            password: '',
            confirmPassword: '',
            isPasswordSet: true,
            isLoginGoogle: false
        },
        onSubmit: (values) => {
            dispatch(registerUser(values)).then(data => {
                if (data?.payload?.success) {
                    toast({
                        title: data?.payload?.message
                    })
                    formik.resetForm()
                    navigate('/shop/login')
                }
                else {
                    toast({
                        variant: "destructive",
                        title: "Đăng ký thất bại",
                        description: data?.payload?.message,
                        action: <ToastAction altText="Try again">Thử lại</ToastAction>
                    })
                }
            }
            )


        },
        validationSchema: userSchemaSignInRegister
    })

    const auth = getAuth(app);
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;

                const data = {
                    username: user.displayName,
                    email: user.email,
                    phone : '',
                    password: '',
                    confirmPassword: '',
                    gender: 'Male',
                    birthday: '',
                    phone: '',
                    isLoginGoogle: true,
                    googleId: user.uid,
                    avartar: user.photoURL,
                    isPasswordSet: false
                }
                if (data && user) {
                    dispatch(registerUser(data)).then(data => {
                        if (data?.payload?.success) {
                            toast({
                                title: data?.payload?.message
                            })
                            formik.resetForm()
                            navigate('/shop/home')
                        }
                        else {
                            toast({
                                variant: "destructive",
                                title: "Đăng ký thất bại",
                                description: data?.payload?.message,
                                action: <ToastAction altText="Try again">Thử lại</ToastAction>
                            })
                        }
                    }
                    )
                }

            })
            .catch((error) => {
                console.error("Lỗi khi đăng nhập với Google:", error);
                message.error(error.message)
            });
    };
    return (
        <div>
            <form action="" onSubmit={formik.handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'>
                <Link to={'/shop/home'}><h1 className='text-black text-3xl font-extrabold'>E-Commerce</h1></Link>
                <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                    <p className='text-3xl'>Đăng Ký</p>
                    <hr className='border-none h-[1.5px] w-8 bg-gray-800' />

                </div>
                <div className='w-full'>
                    <input
                        type="text"
                        className='w-full px-3 py-2 border border-gray-800'
                        placeholder='Họ & Tên'
                        name='username'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        required
                    />
                    {formik.errors.username && (
                        <p className='text-[#dc2626] text-[12px]'>{formik.errors.username}</p>
                    )}
                </div>

                <div className='w-full'>
                    <input
                        type="email"
                        className='w-full px-3 py-2 border border-gray-800'
                        placeholder='Email'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        required
                    />
                    {formik.errors.email && (
                        <p className='text-[#dc2626] text-[12px]'>{formik.errors.email}</p>
                    )}
                </div>

                <div className='w-full'>
                    <input
                        type="text"
                        className='w-full px-3 py-2 border border-gray-800'
                        placeholder='Số điện thoại'
                        name='phone'
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        required
                    />
                    {formik.errors.phone && (
                        <p className='text-[#dc2626] text-[12px]'>{formik.errors.phone}</p>
                    )}
                </div>

                <div className='flex items-center w-full gap-2'>
                    <div className='w-full'>
                        <input
                            type="date"
                            className='w-3/4 px-3 py-2 border border-gray-800'
                            placeholder='Ngày sinh'
                            name='birthday'
                            value={formik.values.birthday}
                            onChange={formik.handleChange}
                            required
                        />
                        {formik.errors.birthday && (
                            <p className='text-[#dc2626] text-[12px]'>{formik.errors.birthday}</p>
                        )}
                    </div>
                    <div className={`${formik.errors.birthday ? '-translate-y-2 ' : ''} w-2/3`}>
                        <div className='border border-gray-800'>
                            <select
                                className='w-full px-3 py-2'
                                name='gender'
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                            >
                                <option value="Male">Nam</option>
                                <option value="Female">Nữ</option>
                            </select>
                        </div>
                        {formik.errors.gender && (
                            <p className='text-[#dc2626] text-[12px]'>{formik.errors.gender}</p>
                        )}
                    </div>

                </div>

                <div className='w-full'>
                    <input
                        type="password"
                        className='w-full px-3 py-2 border border-gray-800'
                        placeholder='Mật khẩu'
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        required
                    />
                    {formik.errors.password && (
                        <p className='text-[#dc2626] text-[12px]'>{formik.errors.password}</p>
                    )}
                </div>

                <div className='w-full'>
                    <input
                        type="password"
                        className='w-full px-3 py-2 border border-gray-800'
                        placeholder='Nhập lại mật khẩu'
                        name='confirmPassword'
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        required
                    />
                    {formik.errors.confirmPassword && (
                        <p className='text-[#dc2626] text-[12px]'>{formik.errors.confirmPassword}</p>
                    )}
                </div>
                <button className='bg-black text-white font-light px-8 py-2 mt-4 rounded-sm w-full' type='submit'>Đăng ký</button>
                <p className='text-sm text-gray-400'>
                    Bạn đã có tài khoản?
                    <span className='cursor-pointer text-blue-600 hover:text-blue-800 hover:underline'>
                        <Link to={'/shop/login'}>Đăng nhập ngay</Link>
                    </span>
                </p>

            </form>
            <div className=' flex flex-col gap-4 mt-8 text-sm text-center'>
                <p>Hoặc, Đăng kí bằng</p>
                <div className='flex justify-center gap-10 text-gray-400'>
                    <button
                        onClick={googleSignIn}
                        className='flex gap-1 items-center cursor-pointer'><FaGoogle className='size-8 text-red-600' /> <span>Google</span></button>
                    <p className='flex gap-1 items-center cursor-pointer'><Facebook className='text-white bg-blue-700 p-1 rounded-full size-8' /> <span>Facebook</span></p>
                </div>
            </div>
        </div>
    )
}

export default ShoppingRegsiter

