import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { FaHeart } from 'react-icons/fa'

const Navigation = () => {
    return (
        <div className='flex items-center py-4 justify-between font-medium'>
            <Link to={'/'}>
                <img src={assets.logo} alt="" className='w-40' />
            </Link>
            <ul className='hidden sm:flex gap-8 text-sm text-gray-500'>
                <NavLink to='/' className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/shop' className="flex flex-col items-center gap-1">
                    <p>SHOP</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-10'>
                <div className='flex items-center gap-6'>
                    <Link to='/favorite' className='relative'>
                        <FaHeart size={20} />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4  text-black bg-gray-200 rounded-full text-[8px] aspect-square'>0</p>
                    </Link>
                    <Link to='/cart' className='relative'>
                        <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4  text-black bg-gray-200 rounded-full text-[8px] aspect-square'>0</p>
                    </Link>
                </div>
                <div className='group relative'>
                    <img src={assets.profile_icon} alt="" className='w-5 cursor-pointer' />
                    <div className='group-hover:block hidden absolute drop-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p className='cursor-pointer hover:text-black'>Orders</p>
                            <p className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation
