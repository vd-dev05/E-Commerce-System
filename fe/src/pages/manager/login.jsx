import { assets } from '@/assets/assets'
import ManagerHeader from '@/components/manager/header'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { loginManager } from '@/store/manager/auth'
import { Facebook } from 'lucide-react'
import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'

const ManagerLogin = () => {

    const [formData, setFormData] = useState({
        emailOrPhone: '',
        password: '',
    })
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
        dispatch(loginManager(formData)).then(data => {
            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message
                })
                setFormData({
                    emailOrPhone: '',
                    password: '',
                })
                navigate('/manager/home')
            }
            else {
                toast({
                    variant: "destructive",
                    title: "Đăng nhập thất bại",
                    description: data?.payload?.message,
                    action: <ToastAction altText="Try again">Thử lại</ToastAction>
                })
            }
        }
        )
    }
    return (
        <div>
            <ManagerHeader title={"Kênh Người Bán"} />
            <div className='my-12 px-36 flex items-center justify-center w-full'>
                <div className='flex items-center justify-center gap-2 w-1/2'>
                    <div className='flex flex-col gap-2 w-2/3'>
                        <h1 className='text-red-500 text-2xl'>Bán hàng chuyên nghiệp</h1>
                        <p className='text-gray-600 text-lg'>Quản lý shop của bạn một cách hiệu quả hơn trên E-Commecre với E-Commecre - Kênh Người bán</p>
                        <img src={assets.manager_login} alt="" className='w-full' />
                    </div>
                </div>
                <div className='flex items-center justify-center w-1/2 rounded-sm mb-10'>
                    <form action="" onSubmit={onSubmit} className='flex flex-col w-[90%] sm:w-2/3 gap-4 text-gray-700 bg-white shadow-md shadow-slate-400 px-8 py-6'>
                        <div className='my-6'>
                            <p className='text-2xl'>Đăng nhập</p>
                        </div>
                        <input type="text"
                            className='w-full px-4 py-3 border border-gray-300 rounded-sm mb-4'
                            placeholder='Email/Số điện thoại'
                            name='emailOrPhone'
                            value={formData.emailOrPhone}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            className='w-full px-4 py-3 border border-gray-300 rounded-sm mb-6'
                            placeholder='Mật khẩu'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button className='bg-red-400 text-white font-light px-8 py-3 rounded-sm w-full' type='submit'>Đăng nhập</button>
                        <div className='w-full flex justify-start text-sm mt-[-8px]'>
                            <p className='cursor-pointer hover:underline text-blue-600'>Quên mật khẩu?</p>
                        </div>
                        <div className=' flex flex-col gap-4 text-sm text-center mb-8'>
                            <p>Hoặc, đăng nhập bằng</p>
                            <div className='flex justify-center gap-10 text-gray-400'>
                                <p className='flex gap-1 items-center cursor-pointer border border-gray-800 px-8 py-1 rounded-sm w-64'><FaGoogle className='size-8 text-red-600' /> <span>Google</span></p>
                                <p className='flex gap-1 items-center cursor-pointer border border-gray-800 px-8 py-1 rounded-sm w-64'><Facebook className='text-white bg-blue-700 p-1 rounded-full size-8' /> <span>Facebook</span></p>
                            </div>
                        </div>

                        <p className='text-[14px] text-center text-gray-400 font-light'>Bạn mới biết tới E-Commerce ?<span className='cursor-pointer ml-1 text-red-500'><Link to={'/manager/register'}>Đăng ký</Link></span></p>
                    </form>
                </div>
            </div>
            <p className='text-center my-10 text-sm text-gray-500'>© 2025 E-Commerce. Tất cả các quyền được bảo lưu.</p>
        </div>
    )
}

export default ManagerLogin
