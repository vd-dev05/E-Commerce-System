import { Link, useLocation } from "react-router";

const ProfileOptions = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    return ( 
        <div className=" duration-500 ">
            <ul>
                <li className={currentPath === '/shop/profile/user/account' ? 'bg-zinc-200' : ''}><Link to={'/shop/profile/user/account'}>Hồ sơ</Link></li>
                <li className={currentPath === '/shop/profile/user/password' ? 'bg-zinc-200' : ''}><Link to={'/shop/profile/user/password'}>Đổi mật khẩu</Link></li>
                <li className={currentPath === '/shop/profile/user/address' ? 'bg-zinc-200' : ''}><Link to={'/shop/profile/user/address'}>Địa chỉ</Link></li>
            </ul>

        </div>
     );
}
 
export default ProfileOptions;