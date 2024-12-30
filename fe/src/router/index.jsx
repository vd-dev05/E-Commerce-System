import ShoppingHome from "@/pages/shop/Home";
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


                </Route>
            </Routes>
        </div>
    );
}

export default RootRouter;