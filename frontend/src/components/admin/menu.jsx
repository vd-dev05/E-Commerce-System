import { LayoutPanelLeft, Shirt, Truck } from 'lucide-react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'



const MenuItems = ({ setOpen }) => {

    const navigate = useNavigate()

    const adminSidebarMenuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            path: '/admin/dashboard',
            icon: <LayoutPanelLeft />
        },
        {
            id: 'products',
            label: 'Products',
            path: '/admin/products',
            icon: <Shirt />
        },
        {
            id: 'orders',
            label: 'Orders',
            path: '/admin/orders',
            icon: <Truck />

        },
    ]

    return (
        <nav className='flex flex-col gap-2 mt-8'>
            {
                adminSidebarMenuItems.map(item => <NavLink id='admin' to={item.path}
                    key={item.id}
                    onClick={() => {
                        setOpen ? setOpen(false) : null
                    }}
                    className='flex items-center gap-4 justify-start rounded-md pl-20 py-2 
                        border-y-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer'>
                    {item.icon}
                    <span className='font-semibold'>{item.label}</span>
                </NavLink>
                )}
        </nav >
    )
}
export default MenuItems