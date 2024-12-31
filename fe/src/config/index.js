import { assets } from "@/assets/assets";

// menu
export const shoppingHeaderItems = [
    {
        id: 1,
        label: "Hỗ trợ",
        name: "support",
        path: "/shop/support"
    },
    {
        id: 2,
        label: "Kênh Người Bán",
        name: "seller",
        path: "/shop/seller"
    },
    {
        id: 3,
        label: "Đổi ngôn ngữ",
        name: "language",
        path: "/shop/language"
    },
    {
        id: 4,
        label: "Thông báo",
        name: "notification",
        icon: assets.notification,

        path: "/shop/notification"
    },
    {
        id: 5,
        label: "Đăng Nhập",
        name: "login",
        path: "/shop/login"
    },
    {
        id: 6,
        label: "Đăng Ký",
        name: "register",
        path: "/shop/register"
    },

]

// category list
export const categoryList = [
    { id: 1, label: "thoi trang nam", url: assets.men, path: "men" },
    { id: 2, label: "thoi trang nu", url: assets.women, path: "women" },
    { id: 3, label: "giay", url: assets.shoes, path: "shoes" },
    { id: 4, label: "dong ho", url: assets.clock, path: "clock" },
    { id: 5, label: "do gia dung", url: assets.appliances, path: "appliances" },
    { id: 6, label: "dien thoai", url: assets.phone, path: "phone" },


]