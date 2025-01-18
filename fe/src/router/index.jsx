import OrderProfile from "@/components/shop/profile/order/order";
import UserProfile from "@/components/shop/profile/user/user"; 
import AdminLogin from "@/pages/admin/auth/login";
import AdminHome from "@/pages/admin/home";
import BlockUser from "@/pages/admin/home/block";
import AdminManager from "@/pages/admin/home/delete/manager";
import AdminUser from "@/pages/admin/home/delete/user";
import AdminTrafic from "@/pages/admin/home/trafic";
import ManagerCategory from "@/pages/manager/category";
import ManagerHome from "@/pages/manager/home";
import ManagerLogin from "@/pages/manager/login";
import ManagerRegister from "@/pages/manager/register";
import AllCategory from "@/pages/shop/allcategory";
import CardProduct from "@/pages/shop/cardProduct";
import ProductDetails from "@/pages/shop/details";
import ShoppingHome from "@/pages/shop/Home";
import ShoppingLogin from "@/pages/shop/login";
import Profile from "@/pages/shop/profile";
import ShoppingRegsiter from "@/pages/shop/regsiter";
import { Navigate, Route, Routes } from "react-router"
const RootRouter = () => {
    return (
        //  Navigation routes
        <div className="font-be flex flex-col w-full h-full ">
            <Routes>
                {/* Route test componet */}
                <Route path="/test" element={<div>Test</div>} />
                <Route path="/" element={<Navigate to="/shop/home" replace />} />
                <Route path="/shop"  >
                    <Route path="home" element={<ShoppingHome />} />
                    <Route path="login" element={<ShoppingLogin />} />
                    <Route path="register" element={<ShoppingRegsiter />} />
                    <Route path="listing/:id" element={<ProductDetails/>}/>
                    <Route path="listing/:id/:card" element={<CardProduct/>}/>
                    <Route path="all_categories" element={<AllCategory/>} />
                    <Route path="profile" element={<Profile/>}>
                        <Route path="user" element={<UserProfile/>}>
                            <Route path="account" element={<div>test acc</div>} />
                            <Route path="password" element={<div>test</div>} />
                            <Route path="address" element={<div>test</div>} />
                        </Route>
                        <Route path="purchase" element={<OrderProfile/>} />
                        <Route path="voucher" element={<div>test</div>} />
                        <Route path="payment" />
                    </Route>
                </Route>
                {/* manager router */}
                <Route path="/manager"  >
                    <Route path="home" element={<ManagerHome />}>
                        <Route path="category" element={<ManagerCategory />} />
                    </Route>
                    <Route path="login" element={<ManagerLogin />} />
                    <Route path="register" element={<ManagerRegister />} />
                </Route>
                {/* admin router */}
                <Route path="/admin"  >
                    <Route path="home" element={<AdminHome />} >
                        <Route path="trafic" element={<AdminTrafic />} />
                        <Route path="user" element={<AdminUser />} />
                        <Route path="manager" element={<AdminManager />} />
                        <Route path="user/delete" element={<div>delete</div>} />
                        <Route path="manager/delete" element={<div>delete</div>} />
                        <Route path="user/block" element={<BlockUser />} />
                        <Route path="manager/block" element={<div></div>} />
                        <Route path="*" element={<Navigate to="/admin/home" />} />
                    </Route>
                    <Route path="login" element={<AdminLogin />} />

                </Route>
            </Routes>
        </div>
    );
}

export default RootRouter;