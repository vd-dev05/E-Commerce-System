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
            </Routes>
        </div>
    );
}

export default RootRouter;