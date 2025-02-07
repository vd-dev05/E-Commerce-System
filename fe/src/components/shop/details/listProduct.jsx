import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatTitleLenght, formatPrice, locationQuery } from "@/lib/utils";
import { FaStar } from "react-icons/fa";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const ProductDetails = () => {
    const {payloadProducts ,isProducts} = useSelector(state => state.shoppingProduct)
    // console.log(payloadProducts , isProducts);
    
    const query = queryString.parse(locationQuery())
    
    
    const nav = useNavigate()   
    const data = [{ name: 'Product 1', price: '$10', image: '/images/product1.jpg' },
    { name: 'Product 2', price: '$20', image: 'https://picsum.photos/200/300', sale: "90", buy: 300 },
    { name: 'Product 3', price: '$30', image: '/images/product3.jpg', sale: "90" },
    { name: 'Product 4', price: '$40', image: '/images/product4.jpg', sale: "90" },
    { name: 'Product 5', price: '$50', image: '/images/product5.jpg', sale: "90" },
    { name: 'Product 6', price: '$60', image: '/images/product6.jpg', sale: "90" },]
    const [visibleItems, setVisibleItems] = useState(5);

    const handleShowMore = () => {
        setVisibleItems(data.length);
    };
    const price = 1000

    
    return (
        <div className="overflow-y-auto w-full">
            <div className="flex justify-between items-center w-full  ">
                <div className="flex items-center gap-5">
                    <h2>Sắp sếp theo</h2>
                    <button
                    onClick={() => {
                        const newQuery = {...query}
                        if (newQuery.sale === "true") {
                            delete newQuery.sale
                        } else {
                            newQuery.sale = "true"
                        }
                        nav(`?${queryString.stringify(newQuery)}`)
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded">Phổ biến</button>
                    <button   
                       onClick={() => {
                        const newQuery = {...query}
                        if (newQuery.sale === "false") {
                            delete newQuery.sale
                        } else {
                            newQuery.sale = "false"
                        }
                        nav(`?${queryString.stringify(newQuery)}`)
                    }} 
                    className="px-2 py-1 rounded border-2">Mới Nhất</button>
                </div>
                <div className="-translate-x-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger>Giá</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem 
                            onClick={() => {
                                const newQuery = {...query}
                                if (newQuery.sort === "asc") {
                                    delete newQuery.sort
                                } else {
                                    newQuery.sort = "asc"
                                }
                                nav(`?${queryString.stringify(newQuery)}`)
                            }}
                            >Giá : Từ thấp đến cao</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                            onClick={() => {
                                const newQuery = {...query}
                                if (newQuery.sort === "desc") {
                                    delete newQuery.sort
                                } else {
                                    newQuery.sort = "desc"
                                }
                                nav(`?${queryString.stringify(newQuery)}`)
                            }}
                            >Giá : Từ cao đến thấp</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {/* list Product */}

            <div className=" grid grid-cols-5 gap-y-5 gap-x-2 ">
                {payloadProducts?.map((item, index) => (
                    <div
                    onClick={() => {
                        window.location.href=`${location.pathname}/${item._id}/`
                    }}
                    key={index} className="drop-shadow-2xl hover:border-red-500 hover:border-2 cursor-pointer duration-75 ">
                        <img
                            className="h-[200px] w-full"
                            src="https://picsum.photos/200/300" alt="anh product" />
                        <div className="px-2">
                            <h3>{formatTitleLenght(item.name)}</h3>

                            <div className="flex items-center gap-2" >
                                <span>{formatPrice(item.salePrice)}</span>
                                <span className="bg-[#ffeeec] text-orange-400 px-2 py-1 rounded line-through">{formatPrice(item.price)}</span>
                            </div>

                            <div className="text-xs flex justify-start gap-5">
                                <span className="flex items-center ">< FaStar className="text-yellow-300" /> 4.9</span>
                                <span className="">Đã bán 3k</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetails;

