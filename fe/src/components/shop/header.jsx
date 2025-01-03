import { shoppingHeaderItems } from "@/config";
import { Link } from "react-router";
import { LogOut, Search, Settings, ShoppingCart, User, UserCog2 } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { FaCartShopping } from "react-icons/fa6";


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

const ShoppingHeader = ({ user, isAuthenticated, handleLogout }) => {


    const filteredHeaderItems = shoppingHeaderItems.filter(item => {
        if (isAuthenticated && (item.name === "login" || item.name === "register")) {
            return false;
        }
        return true;
    });
    return (
        <header className="sticky top-0  bg-white z-50-">
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
                        <div className="cursor-pointer relative">
                            <ShoppingCart size={28} />
                            <p className="absolute size-4 rounded-full bg-red-500 top-[-2px] right-[-2px] text-[10px] flex items-center justify-center text-white">0</p>
                        </div>
                        {
                            isAuthenticated ? (<DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="bg-black">
                                        <AvatarFallback className="bg-black text-white flex items-center font-extralight">
                                            <p>{user?.username[0].toUpperCase()}</p>
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" className="w-56 mr-8 mt-4">
                                    <DropdownMenuLabel className="text-md">Hello, {user?.username}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <UserCog2 className='mr-2 size-4' />
                                        <p>Tài khoản</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <FaCartShopping className='mr-2 size-4' />
                                        <p>Đơn mua</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Settings className='mr-2 size-4' />
                                        <p>Cài đặt</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className='mr-2 size-4' />
                                        <p>Đăng xuất</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>) : <User size={32} className="cursor-pointer" onClick={() => navigate('/shop/login')} />
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}

export default ShoppingHeader;