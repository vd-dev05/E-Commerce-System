import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FaCartShopping } from "react-icons/fa6";
import {LogOut, Settings, UserCog2 } from 'lucide-react'
const AvartarHeader = ({user,handleLogout}) => {
    return ( <DropdownMenu>
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
    </DropdownMenu>) ;
}
 
export default AvartarHeader;