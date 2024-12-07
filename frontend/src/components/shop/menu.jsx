import { shoppingViewHeaderMenuItems } from '@/config'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const ShopMenuItems = () => {
    const [activeItem, setActiveItem] = useState(null);

    const handleToListingPage = (getCurrentMenuItem) => {
        sessionStorage.removeItem("filters");
        const currentFilter =
            getCurrentMenuItem.id !== "home" &&
                getCurrentMenuItem.id !== "products" &&
                getCurrentMenuItem.id !== "search"
                ? {
                    category: [getCurrentMenuItem.id],
                }
                : null;

        sessionStorage.setItem("filters", JSON.stringify(currentFilter));

        location.pathname.includes("listing") && currentFilter !== null
            ? setSearchParams(
                new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
            )
            : navigate(getCurrentMenuItem.path);

        setActiveItem(getCurrentMenuItem.id);
    }


    return (
        <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center lg:flex-row gap-6 '>
            {
                shoppingViewHeaderMenuItems.map((item, index) => (
                    <NavLink onClick={() => handleToListingPage(item)} id='shoplink'
                        className='flex flex-col gap-[2px] items-center text-sm uppercase font-medium'
                        key={item.id}
                        to={item.path}>
                        {item.label}

                    </NavLink>
                ))
            }
        </nav>
    )
}
export default ShopMenuItems
