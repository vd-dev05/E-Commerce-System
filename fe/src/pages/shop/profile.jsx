import ShoppingHeader from "@/components/shop/header";
import Setting from "@/components/shop/profile/delete";
import OrderProfile from "@/components/shop/profile/order/order";
import PaymentProfile from "@/components/shop/profile/payment";
import CheckOutPayment from "@/components/shop/profile/payment/checkout";
import AddressProfile from "@/components/shop/profile/user/address";
import ProfileOptions from "@/components/shop/profile/user/option";
import PasswordProfile from "@/components/shop/profile/user/password";
import UserProfile from "@/components/shop/profile/user/user";
import Voucher from "@/components/shop/profile/voucher/voucher";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router";

const Profile = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const {user, isAuthenticated} = useSelector(state => state.shoppingAuth)
    // console.log(user);
    
    return (
        <div>
            <header>
                <ShoppingHeader user={user} isAuthenticated={isAuthenticated} />
            </header>
            {/* setting */}
            <div className="flex">
                <div className="w-1/6">
                    {/* profile navbar  */}
                    <div>
                        <ul>
                            <li >
                                <Link to={`user/account`}>
                                    Tài khoản của tôi
                                </Link>
                                {(currentPath === '/shop/profile/user' || currentPath === '/shop/profile/user/password' || currentPath === '/shop/profile/user/account' || currentPath === '/shop/profile/user/address')   &&
                                 <div>
                                    <ProfileOptions />
                               
                                </div>}

                            </li>
                            <li className={currentPath === '/shop/profile/purchase' ? 'bg-zinc-200' : ''}>
                                <Link to={'purchase'}>
                                    Đơn mua
                                </Link>
                            </li>
                            {/* <li className={currentPath === '/shop/profile/payment' ? 'bg-zinc-200' : ''}>
                                <Link to={'payment'}>
                                    Thanh toán
                                </Link>
                            </li> */}
                            <li className={currentPath === '/shop/profile/voucher' ? 'bg-zinc-200' : ''}>
                                <Link to={'voucher'}>
                                    Kho Voucher
                                </Link>
                            </li>
                            <li className={(currentPath === '/shop/profile/payment' || currentPath === '/shop/profile/payment/checkout') ? 'bg-zinc-200' : ''}>
                                <Link to={'payment'}>
                                    E-com xu
                                </Link>
                            </li>
                            <li className={(currentPath === '/shop/profile/setting' || currentPath === '/shop/profile/setting/delete') ? 'bg-zinc-200' : ''}>
                                <Link to={'setting'}>
                                    Cài Đặt
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex-grow">
                    {/* <Outlet /> */}
                    {currentPath === '/shop/profile/user/account' && <UserProfile/>}
                    {currentPath === '/shop/profile/user/password' && <PasswordProfile/>}
                    {currentPath === '/shop/profile/user/address' && < AddressProfile/>}
                    {currentPath === '/shop/profile/purchase' && <OrderProfile/>}
                    {currentPath === '/shop/profile/voucher' && < Voucher/>}
                    {currentPath === '/shop/profile/payment' && < PaymentProfile/>}
                    {currentPath === '/shop/profile/payment/checkout' && < CheckOutPayment/>}
                    {currentPath === '/shop/profile/setting' && <Setting />}
                </div>
            </div>
        </div>
    );
}

export default Profile;

