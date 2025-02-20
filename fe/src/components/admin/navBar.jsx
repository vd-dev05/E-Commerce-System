import { Menu } from "antd";
import { HomeIcon } from "lucide-react";
import { useState } from "react";
import { FaAddressCard } from "react-icons/fa6";
import { Link } from "react-router";

const AdminNavBar = () => {

    const menuItems = [
        {
            key: '1',
            label: (
                <Link to="/admin/home" className="flex items-center space-x-2">
                    <HomeIcon className="w-5 h-5 text-white" />
                    <span className="text-black">Home</span>
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to="trafic" className="flex items-center space-x-2">
                    <FaAddressCard className="w-5 h-5 text-white" />
                    <span className="text-black">thông kê người dùng </span>
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link to="user/voucher?s=user" className="flex items-center space-x-2">
                    <FaAddressCard className="w-5 h-5 text-white" />
                    <span className="text-black">Tạo voucher, thông báo</span>
                </Link>
            ),
        },
        {
            key: '4',
            label: (
                <Link to="manager/delete" className="flex items-center space-x-2">
                    <FaAddressCard className="w-5 h-5 text-white" />
                    <span className="text-black">Xóa Nhà bán</span>
                </Link>
            ),
        },
        {
            key: '5',
            label: (
                <Link to="user/block" className="flex items-center space-x-2">
                    <FaAddressCard className="w-5 h-5 text-white" />
                    <span className="text-black">Block User</span>
                </Link>
            ),
        },
        {
            key: '6',
            label: (
                <Link to="manager/block" className="flex items-center space-x-2">
                    <FaAddressCard className="w-5 h-5 text-white" />
                    <span className="text-black">Block Manager</span>
                </Link>
            ),
        },
        {
            key: '7',
            label: (
                <Link to="user" className="flex items-center space-x-2">
                    <FaAddressCard className="w-5 h-5 text-white" />
                    <span className="text-black">Xem Người dùng </span>
                </Link>
            ),
        },
        {
            key: '8',
            label: (
                <Link to="manager" className="flex items-center space-x-2">
                    <FaAddressCard className="w-5 h-5 text-white" />
                    <span className="text-black">Xem Nhà bán</span>
                </Link>
            ),
        },
    ];
    const [selectedKeys, setSelectedKeys] = useState(localStorage.getItem('active') || '0');
    const onSelect = (item) => {
        setSelectedKeys([item.key]);
        localStorage.setItem('active', item.key);
      };

    return (
        <div>
            <Menu
                mode="inline"
                defaultSelectedKeys={selectedKeys}
                onSelect={onSelect}
                items={menuItems}
                className="bg-[#1a2842] h-full flex flex-col p-2"
            />
        </div>
    );
}

export default AdminNavBar