import React, { useState } from 'react'
import { Outlet } from 'react-router'
import AdminSideBar from './sidebar'
import AdminHeader from './header'

const AdminLayout = () => {

    const [openSidebar, setOpenSidebar] = useState(false)

    return (
        <div className='flex min-h-screen w-full'>
            {/*------------Admin Sidebar----------------- */}
            <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
            <div className='flex flex-1 flex-col'>
                {/* -------------Admin header-------------- */}
                <AdminHeader setOpen={setOpenSidebar} />
                <main className='bg-muted/40 p-4 md:p-6'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
