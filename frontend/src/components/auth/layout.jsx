import { assets } from '@/assets/assets'
import React from 'react'
import { Outlet } from 'react-router'

const AuthLayout = () => {
    return (
        <div className='flex min-h-screen w-full'>
            <div className='hidden lg:block w-1/2 relative'>
                <img src={assets.login_panel} className='w-full min-h-screen' />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-slate-400 to-black/90 opacity-60"></div>
            </div>
            <div className='flex flex-1 justify-center items-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout
