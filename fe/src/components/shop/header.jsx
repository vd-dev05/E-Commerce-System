import { assets } from "@/assets/assets";
import { shoppingHeaderItems } from "@/config";
import { Link } from "react-router";
import { Search, ShoppingCart } from 'lucide-react'
const ShoppingHeader = () => {
    const dataFakeSearch = [
        {
            id : 1,
            label : "Áo thun",
            qery : "ao-thun"
        },
        {
            id : 2,
            label : "Quan",
            qery : "quan"
        },
        {
            id : 3,
            label : "Giay",
            qery : "giay"
        },
       
    ]
    return (
        <header className="sticky top-0  bg-white py-2 z-50-">
            <div className="min-w-full px-5 ">
                <div className="flex justify-end gap-4 p-4">
                    {shoppingHeaderItems.map((item) => (
                        <Link key={item.id} to={item.path}>
                            {item.label}
                        </Link>
                    ))}
                </div>
                <div className=" flex items-center justify-center">
                    <Link
                    className="w-1/4"
                    to="/shop/home">e-com</Link>
                    <div className="w-2/3  translate-y-3">
                        <div className=" flex w-full border-2 border-gray-300 ">
                            <input type="text"
                                placeholder="Tìm kiếm sản phẩm"
                                className="  p-2 pl-8 w-full"
                            />
                          < Search 
                            size={30}
                            className=" p-2 m-2 cursor-pointer  h-full  bg-red-400 flex items-center justify-center"
                            color="white"/>
                          
                        </div>
                        <div className="  flex px-4 gap-x-4">
                            { dataFakeSearch.map((item) => (
                                <Link
                                className="text-xs"
                                key={item.id} to={`/shop/search?q=${item.qery}`}>{item.label}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="px-10">
                    <ShoppingCart />
                    </div>
                    <div>
                        <div>
                            Avartar
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
}

export default ShoppingHeader;