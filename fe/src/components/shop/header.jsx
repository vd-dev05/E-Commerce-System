import { shoppingHeaderItems } from "@/config";
import { Link, useNavigate } from "react-router";
import { Search, ShoppingCart, User } from 'lucide-react'

import { useDispatch } from "react-redux";
import { checkAuthUser, logoutUser } from "@/store/Shop/auth";
import { useEffect, useState } from "react";
import AvartarHeader from "./avartar";
import CartShop from "./cart";
import { toast } from "@/hooks/use-toast";


const dataFakeSearch = [
    {
        id: 1,
        label: "Áo thun",
        qery: "ao-thun"
    },
    {
        id: 2,
        label: "Quan",
        qery: "quan"
    },
    {
        id: 3,
        label: "Giay",
        qery: "giay"
    },

]

const ShoppingHeader = ({ user, isAuthenticated, handleLogout, count }) => {
    const dispatch = useDispatch()
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
        dispatch(checkAuthUser())
    }, [dispatch])
    const filteredHeaderItems = shoppingHeaderItems.filter(item => {
        if (isAuthenticated && (item.name === "login" || item.name === "register")) {
            return false;
        }
        return true;
    });
    const navigate = useNavigate()
    // const handleLogout = () => {
    //     dispatch(logoutUser()).then(data => {
    //         if (data?.payload?.success) {
    //             navigate('/shop/login')
    //         }
    //     })
    // }
    return (
        <header className="sticky top-0  bg-white z-40">
            <div className="min-w-full ">
                <div className="flex justify-end gap-4 text-[12px] bg-slate-200 py-1 pr-4">
                    {
                        filteredHeaderItems.map((item) => (
                            <Link key={item.id} to={item.path} className="hover:text-red-500">
                                {item.label}
                            </Link>
                        ))
                    }
                </div>
                <div className=" flex items-center justify-between px-4 py-2">
                    <div className="w-64">
                        <Link to="/shop/home">
                            <h1 className="text-2xl font-bold">
                                E-Commerce
                            </h1>
                        </Link>
                    </div>
                    <div className="w-2/3  translate-y-3 flex flex-col gap-2">
                        <div className=" flex w-full border-2 border-gray-300 relative items-center">
                            <input type="text" placeholder="Tìm kiếm sản phẩm" className="py-2 pl-8 w-full" />
                            < Search size={30} className="cursor-pointer size-8 absolute right-2 text-gray-400 hover:text-red-600" />
                        </div>
                        <div className="  flex px-4 gap-x-4">
                            {dataFakeSearch.map((item) => (
                                <Link
                                    className="text-xs"
                                    key={item.id} to={`/shop/search?q=${item.qery}`}>{item.label}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-8">
                        <div
                            onMouseEnter={() =>{ 
                                setIsHovered(true)
                                // if (isAuthenticated === true)  {
                                //     setIsHovered(true)
                                // } else {
                                //     alert("vui long dang nhap")
                                //     setTimeout(() => {
                                //         navigate('/shop/login')
                                //     }, 3000);
                                 
                                // }
                            }}
                            onMouseLeave={() => setIsHovered(false)}
                            className="cursor-pointer relative ">
                            <ShoppingCart size={28} />
                            <p className={`${count > 0 ? "visible" : "invisible"} absolute size-4 rounded-full bg-red-500 top-[-2px] right-[-2px] text-[10px] flex items-center justify-center text-white`}>{count}</p>
                            {isHovered && (
                              <CartShop/>
                            )}
                        </div>
                        {
                            isAuthenticated ? <AvartarHeader user={user} handleLogout={handleLogout} /> : <User size={32} className="cursor-pointer" onClick={() => navigate('/shop/login')} />
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}

export default ShoppingHeader;