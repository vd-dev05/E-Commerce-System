import AdminLogin from "@/pages/admin/auth/login";
import AdminHome from "@/pages/admin/home";
import AdminManager from "@/pages/admin/home/delete/manager";
import AdminUser from "@/pages/admin/home/delete/user";
import StaTier from "@/pages/admin/home/statistical";
import ManagerHome from "@/pages/manager/home";
import ManagerLogin from "@/pages/manager/login";
import ManagerRegister from "@/pages/manager/register";
import ShoppingHome from "@/pages/shop/Home";
import ShoppingLogin from "@/pages/shop/login";
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
                </Route>
                <Route path="/manager"  >
                    <Route path="home" element={<ManagerHome />} />
                    <Route path="login" element={<ManagerLogin />} />
                    <Route path="register" element={<ManagerRegister />} />
                </Route>

                {/* admin router */}
                <Route path="/admin"  >
                    <Route path="home" element={<AdminHome />} >
                        <Route path="statier" element={<StaTier />} />
                        <Route path="user" element={<AdminUser />} />
                        <Route path="manager" element={<AdminManager />} />
                        <Route path="user/delete" element={<div>delete</div>} />
                        <Route path="manager/delete" element={<div>delete</div>} />
                        <Route path="user/block" element={<div></div>} />
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