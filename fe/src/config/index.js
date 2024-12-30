import { assets } from "@/assets/assets";

// menu
export const shoppingHeaderItems = [
    {
        id : 1,
        label : "hỗ trợ",
        path : "/shop/support"
    },
    {
        id : 2,
        label : "kênh người bán",
        path : "/shop/seller"
    },
    {
        id : 3,
        label : "đổi ngôn ngữ",
        path : "/shop/language"
    },
    {
        id : 4, 
        label : "thông báo",
        icon : assets.notification,
        
        path : "/shop/notification"
    },
    {
        id : 5,
        label : "đăng nhập",
        path : "/shop/login"
    },
    {
        id : 6,
        label : "đăng ký",
        path : "/shop/register"
    },
    
]

// category list
export const categoryList = [
    {id: 1, label: "thoi trang nam", url: assets.men, path: "men"},
    {id: 2, label: "thoi trang nu", url: assets.women, path: "women"},
    {id: 3, label: "giay", url: assets.shoes, path: "shoes"},
    {id: 4, label: "dong ho", url: assets.clock, path: "clock"},
    {id: 5, label: "do gia dung", url: assets.appliances, path: "appliances"},
    {id: 6, label: "dien thoai", url: assets.phone, path: "phone"},
   
    
]