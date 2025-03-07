import { shoppingHeaderItems } from "@/config";
import { Link, useNavigate } from "react-router";
import { Search, ShoppingCart, User } from 'lucide-react'

import { useDispatch, useSelector } from "react-redux";
import { checkAuthUser, logoutUser } from "@/store/Shop/auth";
import { useEffect, useState } from "react";
import AvartarHeader from "./avartar";
import CartShop from "./cart";
import { toast } from "@/hooks/use-toast";
import { message } from "antd";
import { createSearch, getSearch, getToCartProduct, getVoucherPromotion } from "@/store/Shop/users/userThunk";
import ModalNotification from "./notification/modal";
import { chatMessage } from "./chat/details";


const ShoppingHeader = ({count }) => {
    const dispatch = useDispatch()
    const [isHovered, setIsHovered] = useState(false);
    const [isHoverNotification, setIsHoverNotification] = useState(false)
    const [search, setSearch] = useState('')
    const { isAuthenticated, user } = useSelector(state => state.shoppingAuth)
    const { isSearch, payloadSearch, payloadCartProduct, totalCart, isAddToCart } = useSelector(state => state.shoppingProduct)
    const [dataNotification, setDataNotification] = useState([])
    
    useEffect(() => {
        dispatch(checkAuthUser())
        dispatch(getSearch(search))
    }, [dispatch])
    useEffect(() => {
    if (isAuthenticated === true && user !== null) {
        chatMessage.on("userNotification" , (data) => {
            setDataNotification(data)
            message.success(`Bạn có ${data?.length} thông báo mới`);
        })

        return () => {
            chatMessage.off("userNotification")
        }
    }
    }, [isAuthenticated,user, dispatch])
    
    useEffect(() => {
        if ( isHoverNotification === true) {
            dispatch(getVoucherPromotion())
        }
        if (payloadCartProduct === null && isAuthenticated === true && user !== null) dispatch(getToCartProduct())        
    }, [isAddToCart, isHoverNotification , isAuthenticated ,user])
    //   console.log(payloadSearch);
    const filteredHeaderItems = shoppingHeaderItems.filter(item => {
        if (isAuthenticated && (item.name === "login" || item.name === "register")) {
            return false;
        }
        return true;
    });
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logoutUser()).then(data => {
            if (data?.payload?.success) {
                navigate('/shop/login')
            }
        })
    }



    return (
        <header className="sticky top-0  bg-white z-40">
            <div className="min-w-full ">
                <div
                 onMouseLeave={() => setIsHoverNotification(false)}
                className="flex justify-end gap-4 text-[12px] bg-slate-200 py-1 pr-4">
                    {
                        filteredHeaderItems.map((item) => (
                            item.id === 4 ? (
                                <div key={item.id}>
                                    <Link key={item.id}
                                        onMouseEnter={() => {
                                            setIsHoverNotification(true)
                                        }}
                                        className="hover:text-red-500 cursor-pointer">
                                        {item.label} {dataNotification ? dataNotification.length > 0 && <span className="text-red-500">({dataNotification.length})</span> : ''}
                                    </Link>
                                    {isHoverNotification && <ModalNotification dataNotification={dataNotification}/>}
                                </div>

                            ) : (
                                <Link key={item.id} to={item.path} className="hover:text-red-500">
                                    {item.label}
                                </Link>
                            )
                        ))
                    }
                </div>
                <div
                    onMouseLeave={() => setIsHovered(false)}
                    className=" flex items-center justify-between px-4 py-2">
                    <div className="w-64">
                        <Link to="/shop/home">
                            <h1 className="text-2xl font-bold">
                                E-Commerce
                            </h1>
                        </Link>
                    </div>
                    <div className="w-2/3  translate-y-3 flex flex-col gap-2">
                        <div className=" flex w-full border-2 border-gray-300 relative items-center rounded-sm">
                            {/* tim kiem san pham */}
                            <input
                                onChange={(e) => setSearch(e.target.value.replace(/<|>|&|"/g, ''))}
                                onKeyDown={(e) => {
                                    if (isAuthenticated === false) return message.error("Vui lòng đăng nhập để sử dụng chức năng tìm kiếm")
                                    if (!search && e.key === 'Enter') message.error("không tìm thấy giá trị tìm kiếm ")
                                    if (e.key === 'Enter') {
                                        dispatch(createSearch({ search }))
                                        navigate(`?q=${search}`)

                                    }
                                }}
                                 autocomplete="off"
                                type="text" placeholder="Tìm kiếm sản phẩm" className="py-2 pl-8 w-full " />
                            < Search
                                onClick={() => {
                                    if (search) dispatch(createSearch(search))
                                    else {
                                        message.error("không tìm thấy giá trị tìm kiếm ")
                                    }
                                }}
                                size={30} className="cursor-pointer size-8 absolute right-2 text-gray-400 hover:text-red-600" />
                        </div>
                        <div className="  flex px-4 gap-x-4">
                            {isSearch === true && payloadSearch?.map((item) => (
                                <Link
                                    className="text-xs"
                                    key={item?._id} to={`/shop/search?q=${item.search}`}>{item.search}</Link>
                            ))}

                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-8">
                        <div
                            onMouseEnter={() => {
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
                            className="cursor-pointer relative ">
                            <ShoppingCart size={28} />
                            <span className={`${totalCart > 0 ? "visible" : "invisible"} absolute size-4 rounded-full bg-red-500 top-[-2px] right-[-2px] text-[10px] flex items-center justify-center text-white`}>{totalCart}</span>
                            {isHovered && (
                                <CartShop />
                            )}
                        </div>
                        {
                            isAuthenticated ? <AvartarHeader
                                user={user} handleLogout={handleLogout} /> :
                                <User size={32} className="cursor-pointer" onClick={() => navigate('/shop/login')}

                                />
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}

export default ShoppingHeader;