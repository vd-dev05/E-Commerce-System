import { Store } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router'
import ManagerMenu from './menu'

const ManagerSideBar = () => {

    const navigate = useNavigate()

    return (
        <aside className='w-64 border-r flex-col bg-background p-6 flex'>
            <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/manager/dashboard')}>
                <Store size={30} />
                <h1 className='text-xl font-semibold'>Manager Panel</h1>
            </div>
            <ManagerMenu />
        </aside>
    )
}

export default ManagerSideBar
