import Setting from "@/components/shop/profile/delete";
import NotificationWallet from "@/components/shop/profile/notification/wallet";
import NotificationEcom from "@/components/shop/profile/notification/ecom";
import NotificationOrder from "@/components/shop/profile/notification/order";
import NotificationUserPromotion from "@/components/shop/profile/notification/promotion";
import OrderProfile from "@/components/shop/profile/order/order";
import PaymentProfile from "@/components/shop/profile/payment";
import CheckOutPayment from "@/components/shop/profile/payment/checkout";
import AddressProfile from "@/components/shop/profile/user/address";
import PasswordProfile from "@/components/shop/profile/user/password";
import UserProfile from "@/components/shop/profile/user/user"; 
import AdminLogin from "@/pages/admin/auth/login";
import AdminHome from "@/pages/admin/home";
import BlockUser from "@/pages/admin/home/block";
import AdminManager from "@/pages/admin/home/delete/manager";
import AdminUser from "@/pages/admin/home/delete/user";
import AdminTrafic from "@/pages/admin/home/trafic";
import TrashUser from "@/pages/admin/home/trashUser";
import VoucherAdmin from "@/pages/admin/home/voucher";
import ManagerCategory from "@/pages/manager/category";
import ManagerHome from "@/pages/manager/home";
import ManagerLogin from "@/pages/manager/login";
import ManagerProduct from "@/pages/manager/product";
import ManagerRegister from "@/pages/manager/register";
import AllCategory from "@/pages/shop/allcategory";
import BlockUserShop from "@/pages/shop/block";
import CardProduct from "@/pages/shop/cardProduct";
import ProductDetails from "@/pages/shop/details";
import ShoppingHome from "@/pages/shop/Home";
import ShoppingLogin from "@/pages/shop/login";
import Profile from "@/pages/shop/profile";
import ShoppingRegsiter from "@/pages/shop/regsiter";
import ShoppingCart from "@/pages/shop/shoppingCart";
import ShoppingPayment from "@/pages/shop/shoppingPayment";
import Test from "@/test";
import { Navigate, Route, Routes } from "react-router"
const RootRouter = () => {
    return (
        //  Navigation routes
        <div className="font-be flex flex-col w-full h-full ">
            <Routes>
                {/* Route block user componet */}
                <Route path="/block" element={<BlockUserShop/>} />
                {/* Route test componet */}
                <Route path="/test" element={<Test/>} />
                <Route path="/" element={<Navigate to="/shop/home" replace />} />
                <Route path="/shop"  >
                    <Route path="home" element={<ShoppingHome />} />
                    <Route path="login" element={<ShoppingLogin />} />
                    <Route path="register" element={<ShoppingRegsiter />} />
                    <Route path="listing/:id" element={<ProductDetails/>}/>
                    <Route path="listing/:id/:cardId" element={<CardProduct/>}/>
                    <Route path="cart" element={<ShoppingCart/>} />
                    <Route path="checkout/:id" element={<ShoppingPayment/>}/>
                    <Route path="all_categories" element={<AllCategory/>} />
                    <Route path="profile" element={<Profile/>}>
                        <Route path="user" element={<UserProfile/>}>
                            <Route path="account" element={< UserProfile/>}/>
                            <Route path="password" element={<PasswordProfile/>} />
                            <Route path="address" element={< AddressProfile/>} />
                        </Route>
                        <Route path="notifications" element={<NotificationUserPromotion/>}>
                            <Route path="promotion" element={<NotificationUserPromotion/>}/>
                            <Route path="wallet" element={<NotificationWallet/>}/>
                            <Route path="order" element={<NotificationOrder/>} />
                            <Route path="ecom" element={<NotificationEcom/>} />
                            
                        </Route>
                        
                        <Route path="purchase" element={<OrderProfile/>} />
                        <Route path="voucher" element={<div>test</div>} />
                        <Route path="payment" element={<PaymentProfile/>}/>
                        <Route path="payment/checkout" element={<CheckOutPayment/>}/>
                        <Route path="setting" element={<Setting/>}/>
                    </Route>
                </Route>
                {/* manager router */}
                <Route path="/manager"  >
                    <Route path="home" element={<ManagerHome />}>
                        <Route path="category" element={<ManagerCategory />} />
                        <Route path="product" element={<ManagerProduct />} />
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
                        <Route path="user/voucher" element={<VoucherAdmin  />  } />
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