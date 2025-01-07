import ManagerSideBar from '@/components/manager/sidebar'
import { checkAuthManager, logoutManager } from '@/store/manager/auth'
import { LogOut } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'

const ManagerHome = () => {
    const dispatch = useDispatch()
    const { manager, isAuthenticated } = useSelector(state => state.managerAuth)
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logoutManager()).then(data => {
            if (data?.payload?.success) {
                navigate('/manager/login')
            }
        })
    }
    useEffect(() => {
        dispatch(checkAuthManager())
    }, [dispatch])
    console.log(manager);
    console.log(isAuthenticated);

    return (
        <div className='flex min-h-screen w-full'>

            {/* Sidebar */}
            <ManagerSideBar />
            <div className='flex flex-1 flex-col'>
                <div className='flex items-center px-10 py-4 justify-between w-full border-b'>
                    {
                        isAuthenticated ?
                            <div className='flex flex-1 justify-end items-center gap-4'>
                                <p>{manager.manager_name}</p>
                                <button onClick={handleLogout}
                                    className='bg-black text-white inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow'>
                                    <LogOut />
                                    Logout
                                </button>
                            </div> : null
                    }
                </div>
                <main className='p-6 bg-muted/40'>
                    <Outlet />
                </main>
            </div>


        </div>

    )
}

export default ManagerHome
