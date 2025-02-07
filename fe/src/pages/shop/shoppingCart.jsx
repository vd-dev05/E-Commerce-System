import { Checkbox } from "@/components/ui/checkbox";
import { formatPrice, formatTitleLenght } from "@/lib/utils";
import { addToCart, getCoinPaypal, removeToCart } from "@/store/Shop/users";
import { message, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

const ShoppingCart = () => {

    const dispatch = useDispatch()
    const nav = useNavigate()
    const { cartIndex, coinUpdate } = useSelector(state => state.shoppingProduct)
    const [IsPrice, setIsPrice] = useState(false)
    
    const handleSelect = (e) => {
        setIsPrice(e.target.value === "usd")
    }

    useEffect(() => {
        dispatch(getCoinPaypal())
    }, [])

    return (
        <div>
            <header>
                <div className="p-10 flex items-center gap-5 drop-shadow-lg border-b-2">
                    <Link
                        to={"/shop/home"}
                    >
                        <h1 className="text-3xl font-bold">E-Commerce</h1>
                    </Link>
                    <hr className="h-[40px] border-[1px] border-red-500" />
                    <p className="text-lg border-red-500">Giỏ Hàng</p>
                </div>

            </header>
            <main className="px-10 py-2 bg-slate-50">
                <section>
                    <div className="flex justify-between bg-white p-5 drop-shadow-sm my-2" >
                        <div className="flex items-center gap-5">
                            <span>        <Checkbox /></span>
                            <p>Sản phẩm</p>
                        </div>
                        <div className="flex gap-20 px-10 ">
                            <p>Đơn Giá </p>
                            <p>Số Lượng</p>
                            <p>Số Tiền</p>
                            <p>Thao tác</p>
                        </div>
                    </div>
                </section>
                {[Array.from({ length: 10 }, (_, index) => {
                    return (<section key={index}>
                        <div className="bg-white p-5 drop-shadow-sm my-2">
                            <div className="flex items-center  justify-between gap-5">
                                <div className="flex gap-5">
                                    <Checkbox />
                                    <img
                                        className="h-[56px]"
                                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg" alt="" />

                                    <Tooltip title="Quần dài nam Daily Pants sợi Sorona, nhuộm Cleandye Coolmate">
                                        <h2 >{formatTitleLenght("Quần dài nam Daily Pants sợi Sorona, nhuộm Cleandye Coolmate", 20)}</h2>
                                    </Tooltip>
                                    <div className="flex flex-col">
                                        <span>Phân Loại Hàng : </span>
                                        <span>Đen</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex gap-20 items-center px-10">
                                        <div className="space-x-5">
                                            <span className="line-through decoration-solid">₫ 1000</span>
                                            <span className="text-red-500">₫ 500</span>
                                        </div>

                                        <div>
                                            <button
                                                onClick={() => {
                                                    if (cartIndex === 0) message.error("Vui lòng chọn thêm số lượng ")
                                                    dispatch(removeToCart())
                                                }}
                                                className="bg-gray-300 px-2 py-1 rounded-md">-</button>
                                            <input type="text" value={cartIndex} className="w-12 px-2 py-1 text-center border-gray-300 border-[1px] rounded-md" />
                                            <button
                                                onClick={() => {
                                                    dispatch(addToCart())
                                                }}
                                                className="bg-gray-300 px-2 py-1 rounded-md">+</button>
                                        </div>
                                        <div>
                                            <span className="text-red-500">₫ 500</span>
                                        </div>
                                        <div>

                                            <button
                                                className="bg-red-500 px-2 py-1 rounded-md text-white"
                                            >Xóa </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </section>)
                })]}
                {/* <section>
                    <div className="bg-white p-5 drop-shadow-sm my-2">
                        <div className="flex items-center  justify-between gap-5">
                            <div className="flex gap-5">
                                <Checkbox />
                                <img
                                    className="h-[56px]"
                                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg" alt="" />

                                <Tooltip title="Quần dài nam Daily Pants sợi Sorona, nhuộm Cleandye Coolmate">
                                    <h2 >{formatTitleLenght("Quần dài nam Daily Pants sợi Sorona, nhuộm Cleandye Coolmate", 20)}</h2>
                                </Tooltip>
                                <div className="flex flex-col">
                                    <span>Phân Loại Hàng : </span>
                                    <span>Đen</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-20 items-center px-10">
                                    <div className="space-x-5">
                                        <span className="line-through decoration-solid">₫ 1000</span>
                                        <span className="text-red-500">₫ 500</span>
                                    </div>

                                    <div>
                                        <button
                                            onClick={() => {
                                                if (cartIndex === 0) message.error("Vui lòng chọn thêm số lượng ")
                                                dispatch(removeToCart())
                                            }}
                                            className="bg-gray-300 px-2 py-1 rounded-md">-</button>
                                        <input type="text" value={cartIndex} className="w-12 px-2 py-1 text-center border-gray-300 border-[1px] rounded-md" />
                                        <button
                                            onClick={() => {
                                                dispatch(addToCart())
                                            }}
                                            className="bg-gray-300 px-2 py-1 rounded-md">+</button>
                                    </div>
                                    <div>
                                        <span className="text-red-500">₫ 500</span>
                                    </div>
                                    <div>

                                        <button
                                            className="bg-red-500 px-2 py-1 rounded-md text-white"
                                        >Xóa </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </section> */}

                <section>
                    <div className="flex  p-5 bg-slate-50 w-full ">
                        <div className="w-full">
                            <hr />
                            <div className="flex justify-end p-5 gap-10">
                                <div className="flex gap-2 items-center ">
                                    <p>e-com tài khoản </p>
                                    <Checkbox />
                                </div>
                                <div>
                                    <p>     Thanh toán qua tài khoản e-com </p>
                                    <div>
                                        Số dư : <span>    <span>{IsPrice ? coinUpdate : formatPrice(coinUpdate * 25000)}</span>
                                            <select name="" id="" onChange={handleSelect}>
                                                <option value="vnd">VND</option>
                                                <option value="usd">USD</option>
                                            </select>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="w-full flex items-center justify-between">
                                <div className="flex">
                                    <div className="flex p-5 items-center gap-5">
                                        <Checkbox />
                                        <span>
                                            Chọn tất cả <span>(10)</span>
                                        </span>
                                    </div>
                                    <button>Xóa</button>
                                </div>

                                <div className=" items-end justify-end">
                                    <div className="flex gap-5">
                                        <p>
                                            Tổng thanh toán sản phẩm<span>(0) sản phẩm </span>
                                        </p>
                                        <span>0 Đ</span>
                                    </div>

                                    <button
                                    onClick={() => {
                                        nav('/shop/checkout/123')
                                    }}
                                    className="bg-red-500 p-2  rounded-sm text-white"
                                    >Mua Hàng</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </main>

        </div>
    );
}

export default ShoppingCart;