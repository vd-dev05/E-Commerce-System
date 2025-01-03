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
            </Routes>
        </div>
    );
}

export default RootRouter;