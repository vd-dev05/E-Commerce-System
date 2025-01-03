import { checkAuthManager, logoutManager } from '@/store/manager/auth'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

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
        <div className='flex items-center px-10 py-4 justify-between w-full'>
            <p className='text-3xl font-bold'> Manager Home</p>
            {isAuthenticated ? <div className='flex items-center gap-4'>
                <p>{manager.manager_name}</p>
                <button onClick={handleLogout} className='bg-black text-white p-2'>Logout</button>
            </div> : null}
        </div>
    )
}

export default ManagerHome
