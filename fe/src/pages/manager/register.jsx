import { assets } from '@/assets/assets'
import ManagerHeader from '@/components/manager/header'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { registerManager } from '@/store/manager/auth'
import { Facebook, Gift, Handshake, Store } from 'lucide-react'
import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'

const ManagerRegister = () => {

    const [formData, setFormData] = useState({
        manager_name: '',
        email: '',
        password: '',
        phone: ''
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

        dispatch(registerManager(formData)).then(data => {
            if (data?.payload?.success) {
                toast({
                    title: data?.payload?.message
                })
                setFormData({
                    manager_name: '',
                    email: '',
                    password: '',
                    phone: ''
                })
                navigate('/manager/login')
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
        <div className='flex flex-col min-h-screen'>
            <ManagerHeader title={"Đăng Ký"} />
            <div className='px-36 flex flex-grow items-center justify-center w-full min-h-screen bg-cover bg-center' style={{ backgroundImage: `url(${assets.manager_register})` }} >
                <div className='flex items-center justify-center gap-2 w-1/2'>
                    <div className='flex flex-col gap-2 w-2/3'>
                        <h1 className='text-red-500 text-2xl'>E-Commecre Việt Nam</h1>
                        <p className='text-red-500 text-4xl font-normal'>Trở thành Người bán ngay hôm nay</p>
                        <div className='flex flex-col gap-4 mt-4 text-red-500 text-lg'>
                            <div className='flex items-center justify-start gap-8 mt-6'>
                                <Store size={56} />
                                <p>Nền tảng thương mại điện tử hàng đầu Đông Nam Á và Đài Loan</p>
                            </div>

                            <div className='flex items-center justify-start gap-8 mt-6'>
                                <Handshake size={56} />
                                <p> Dẫn đầu lượng người dùng trên ứng dụng mua sắm tại Việt Nam</p>
                            </div>
                            <div className='flex items-center justify-start gap-8 mt-6'>
                                <Gift size={40} />
                                <p>Phát triển trở thành thương hiệu toàn cầu</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center w-1/2 rounded-sm mb-10'>
                    <form action="" onSubmit={onSubmit} className='flex flex-col w-[90%] sm:w-2/3 gap-4 text-gray-700 bg-white shadow-md shadow-slate-400 px-8 py-6'>
                        <p className='text-2xl'>Đăng ký</p>
                        <input type="text"
                            className='w-full px-4 py-3 border border-gray-300 rounded-sm '
                            placeholder='Tên cửa hàng'
                            name='manager_name'
                            value={formData.manager_name}
                            onChange={handleChange}
                            required
                        />
                        <input type="email"
                            className='w-full px-4 py-3 border border-gray-300 rounded-sm '
                            placeholder='Email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input type="text"
                            className='w-full px-4 py-3 border border-gray-300 rounded-sm'
                            placeholder='Số điện thoại'
                            name='phone'
                            value={formData.phone}
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
                        <button className='bg-red-400 text-white font-light px-8 py-3 rounded-sm w-full' type='submit'>Đăng ký</button>
                        <div className=' flex flex-col gap-4 text-sm text-center mb-4'>
                            <div className='flex items-center justify-between mt-4'>
                                <p className='h-[1px] bg-gray-300 w-40'></p>
                                <p className='text-gray-400'>HOẶC</p>
                                <p className='h-[1px] bg-gray-300 w-40'></p>
                            </div>
                            <div className='flex justify-center gap-10 text-gray-400'>
                                <p className='flex gap-1 items-center cursor-pointer border border-gray-800 px-8 py-1 rounded-sm w-64'><FaGoogle className='size-8 text-red-600' /> <span>Google</span></p>
                                <p className='flex gap-1 items-center cursor-pointer border border-gray-800 px-8 py-1 rounded-sm w-64'><Facebook className='text-white bg-blue-700 p-1 rounded-full size-8' /> <span>Facebook</span></p>
                            </div>
                            <div className='flex flex-col justify-center mt-4 text-[12px]'>
                                <p>Bằng việc đăng kí, bạn đã đồng ý với Shopee về</p>
                                <p><span className='text-red-500 cursor-pointer'>Điều khoản dịch vụ</span> & <span className='text-red-500 cursor-pointer'>Chính sách bảo mật</span></p>
                            </div>
                        </div>
                        <p className='text-[14px] text-center text-gray-400 font-light'>Bạn đã có tài khoản<span className='cursor-pointer ml-1 text-red-500'><Link to={'/manager/login'}>Đăng nhập</Link></span></p>
                    </form>
                </div>
            </div>
            <footer className='text-center my-10 text-sm text-gray-500'>© 2025 E-Commerce. Tất cả các quyền được bảo lưu.</footer>
        </div>
    )
}

export default ManagerRegister
