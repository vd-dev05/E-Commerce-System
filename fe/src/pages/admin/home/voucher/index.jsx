import VoucherAllUser from "@/components/admin/ui/VoucherAllUser";
import VoucherCreate from "@/components/admin/ui/VoucherCreate";
import VoucherEditUser from "@/components/admin/ui/VouchereditUser";
import { getVoucherPromotion } from "@/store/admin";
import queryString from "query-string";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

const VoucherAdmin = () => {
    const location = useLocation()
    const query = queryString.parse(location.search)
    const {isGetVoucherPromotion, payloadGetVoucherPromotion} = useSelector(state => state.adminAuth)
    const dispatch  = useDispatch()
    useEffect(() => {
        if (isGetVoucherPromotion === false && payloadGetVoucherPromotion === null ) {
            dispatch(getVoucherPromotion())
        } else {
            return
        }
    }, [isGetVoucherPromotion])
    
    return (
        <div className=" p-2 m-2 flex flex-col  gap-5">
            <div className="flex gap-5 p-2 m-2 bg-white ">
                <Link
                className={`${query.s === 'user' ? 'border-b-2 pb-2 transition duration-300 ease-in-out' :'transition duration-300 ease-in-out opacity-50'}`}
                to="?s=user">Xem tất cả voucher <span>({payloadGetVoucherPromotion ? payloadGetVoucherPromotion?.length : 0})</span></Link>
                <Link
                className={`${query.s === 'create' ? 'border-b-2 pb-2 transition duration-300 ease-in-out' :'transition duration-300 ease-in-out opacity-50'}`}
                to="?s=create">Tạo voucher</Link>
                                   <Link
                className={`${query.s === 'notification' ? 'border-b-2 pb-2 transition duration-300 ease-in-out' :'transition duration-300 ease-in-out opacity-50'}`}
                to="?s=notification">Tạo Thông báo</Link>
                <Link
                className={`${query.s === 'edit' ? 'border-b-2 pb-2 transition duration-300 ease-in-out' :'transition duration-300 ease-in-out opacity-50'}`}
                to="?s=edit">Cập nhật voucher</Link>
              
            </div>

            <div className=" m-2 drop-shadow-md bg-white">
                {query.s === 'user' && <VoucherAllUser />}
                {query.s === "create" && <VoucherCreate />}
                {query.s === "edit" && <VoucherEditUser />}
            </div>

        </div>
    );
}

export default VoucherAdmin;