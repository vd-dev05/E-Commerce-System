import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { registerUser } from '@/store/Shop/auth'
import { Facebook ,  } from 'lucide-react'
import React, { useState } from 'react'
import { FaGoogle , FaPassport } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { MdVisibility } from "react-icons/md";
const ShoppingRegsiter = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: 'Male',
        birthday: '',
        phone: ''
    })
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

    const onSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast({
                variant: "destructive",
                title: "Đăng ký thất bại",
                description: "Xác nhận mật khẩu không trùng khớp",
                action: <ToastAction altText="Try again">Thử lại</ToastAction>
            })
            return
        }
        dispatch(registerUser(formData)).then(data => {
            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message
                })
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    gender: 'Male',
                    birthday: '',
                    phone: ''
                })
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
    }

    return (
        <div>
            <form action="" onSubmit={onSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'>
                <Link to={'/shop/home'}><h1 className='text-black text-3xl font-extrabold'>E-Commerce</h1></Link>
                <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                    <p className='text-3xl'>Đăng Ký</p>
                    <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
                  
                </div>
                <input
                    type="text"
                    className='w-full px-3 py-2 border border-gray-800'
                    placeholder='Họ & Tên'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    className='w-full px-3 py-2 border border-gray-800'
                    placeholder='Email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    className='w-full px-3 py-2 border border-gray-800'
                    placeholder='Số điện thoại'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <div className='flex items-center w-full gap-2'>
                    <input
                        type="date"
                        className='w-3/4 px-3 py-2 border border-gray-800'
                        placeholder='Ngày sinh'
                        name='birthday'
                        value={formData.birthday}
                        onChange={handleChange}
                        required />
                    <div className='border border-gray-800'>
                        <select
                            className='w-full px-3 py-2 '
                            name='gender'
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="Male">Nam</option>
                            <option value="Female">Nữ</option>
                        </select>
                    </div>
                </div>
                <input
                    type="password"
                    className='w-full px-3 py-2 border border-gray-800'
                    placeholder='Mật khẩu'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required />
                <input
                    type="password"
                    className='w-full px-3 py-2 border border-gray-800'
                    placeholder='Nhập lại mật khẩu'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required />
                <button className='bg-black text-white font-light px-8 py-2 mt-4 rounded-sm w-full' type='submit'>Đăng ký</button>
                <p className='text-sm text-gray-400'>
                    Bạn đã có tài khoản?
                    <span className='cursor-pointer text-blue-600 hover:text-blue-800 hover:underline'>
                        <Link to={'/shop/login'}>Đăng nhập ngay</Link>
                    </span>
                </p>
                <div className=' flex flex-col gap-4 mt-8 text-sm text-center'>
                    <p>Hoặc, Đăng kí bằng</p>
                    <div className='flex justify-center gap-10 text-gray-400'>
                        <p className='flex gap-1 items-center cursor-pointer'><FaGoogle className='size-8 text-red-600' /> <span>Google</span></p>
                        <p className='flex gap-1 items-center cursor-pointer'><Facebook className='text-white bg-blue-700 p-1 rounded-full size-8' /> <span>Facebook</span></p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ShoppingRegsiter
