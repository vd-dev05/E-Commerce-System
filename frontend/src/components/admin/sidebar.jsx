import { ChartLine } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import MenuItems from './menu'



const AdminSideBar = ({ open, setOpen }) => {

    const navigate = useNavigate()

    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64">
                    <div className='flex flex-col h-full'>
                        <SheetHeader className="border-b flex flex-row items-center gap-2 pb-3">
                            <ChartLine size={30} />
                            <SheetTitle>Admin Panel</SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>
            <aside className='hidden w-64 border-r flex-col bg-background p-6 lg:flex'>
                <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/admin/dashboard')}>
                    <ChartLine size={30} />
                    <h1 className='text-2xl font-semibold'>Admin Panel</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    )
}

export default AdminSideBar
