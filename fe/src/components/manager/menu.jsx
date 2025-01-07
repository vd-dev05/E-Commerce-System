import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { useNavigate } from 'react-router'
import path from 'path'

const ManagerMenu = () => {

    const managerSidebarMenuItems = [
        {
            id: 1,
            label: 'Quản Lý Đơn Hàng',
            items: [
                {
                    id: 1 - 1,
                    label: 'Tất cả',
                    path: ''
                },
                {
                    id: 1 - 2,
                    label: 'Giao hàng',
                    path: ''
                }
            ]
        },
        {
            id: 2,
            label: 'Quản Lý Sản Phẩm',
            items: [
                {
                    id: 2 - 1,
                    label: 'Danh mục sản phẩm',
                    path: '/manager/home/category'
                },
                {
                    id: 2 - 2,
                    label: 'Danh sách sản phẩm',
                    path: '/manager/home/product'
                }
            ]
        },
        {
            id: 3,
            label: 'Kênh Marketing',

        },
    ]

    const navigate = useNavigate()
    return (
        <nav className='flex flex-col gap-2 mt-8'>
            <Accordion type="multiple" collapsible className="w-full">
                {
                    managerSidebarMenuItems?.map((menu) => (
                        <AccordionItem value={`item-${menu.id}`} key={menu.id}>
                            <AccordionTrigger className="text-gray-400">{menu.label}</AccordionTrigger>
                            <div className='pl-2 text-gray-900'>
                                {
                                    menu?.items?.map((item) => (
                                        <AccordionContent className='cursor-pointer hover:underline'
                                            key={item.id}
                                            onClick={() => navigate(item.path)}>
                                            {item.label}
                                        </AccordionContent>
                                    ))
                                }

                            </div>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </nav >
    )
}

export default ManagerMenu
