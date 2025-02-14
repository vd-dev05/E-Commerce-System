import { Facebook } from 'lucide-react'
import { FaGoogle } from "react-icons/fa";
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/Shop/auth';
import { ToastAction } from '@/components/ui/toast';
import { useFormik } from 'formik';
import { userSchemaSignUpLogin } from '@/validations/Yup/useYupForm';

const ShoppingLogin = () => {

    const { toast } = useToast()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => {
            dispatch(loginUser(values)).then(data => {
                if (data?.payload?.success) {
                    toast({
                        title: data?.payload?.message
                    })
                    navigate('/shop/home')
                }
                else {
                    toast({
                        variant: "destructive",
                        title: "Đăng nhập thất bại",
                        description: data?.payload?.message,
                        action: <ToastAction altText="Try again">Thử lại</ToastAction>
                    })
                }
            })
        },
        validationSchema: userSchemaSignUpLogin
    })
    return (
        <form action="" onSubmit={formik.handleSubmit}
            className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-32 gap-4 text-gray-700'>
            <Link to={'/shop/home'}><h1 className='text-black text-3xl font-extrabold'>E-Commerce</h1></Link>
            <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                <p className='text-3xl'>Đăng Nhập</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
            </div>
            <div className='w-full '>
                <input type="email"
                    className=' w-full px-3 py-2 border border-gray-800'
                    placeholder='Email'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    required
                />
                <div>
                    {formik.errors.email && (
                        <p className='text-[#dc2626]  text-[12px]'>{formik.errors.email}</p>
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
                <div>
                    {formik.errors.password && (
                        <p className='text-[#dc2626] text-[12px]'>{formik.errors.password}</p>
                    )}
                </div>
            </div>

            <div className='w-full flex justify-end text-sm mt-[-8px]'>
                <p className='cursor-pointer hover:underline'>Forgot your password?</p>
            </div>
            <button
                className='bg-black text-white font-light px-8 py-2 mt-4 rounded-sm w-full'
                type='submit'>
                Đăng nhập
            </button>
            <p className='text-sm text-gray-400'>Bạn chưa có tài khoản? <span className='cursor-pointer text-blue-600 hover:text-blue-800 hover:underline'><Link to={'/shop/register'}>Đăng ký</Link></span></p>
            <div className=' flex flex-col gap-4 mt-10 text-sm text-center'>
                <p>Hoặc, đăng nhập bằng</p>
                <div className='flex justify-center gap-10 text-gray-400'>
                    <p className='flex gap-1 items-center cursor-pointer'><FaGoogle className='size-8 text-red-600' /> <span>Google</span></p>
                    <p className='flex gap-1 items-center cursor-pointer'><Facebook className='text-white bg-blue-700 p-1 rounded-full size-8' /> <span>Facebook</span></p>
                </div>
            </div>
        </form>
    )
}

export default ShoppingLogin

