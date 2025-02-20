import { formatDateCountDown } from "@/lib/utils";
import { setPayLoadEditVoucher } from "@/store/admin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const VoucherAllUser = () => {
    const { isGetVoucherPromotion, payloadGetVoucherPromotion } = useSelector(state => state.adminAuth)
    const dispatch = useDispatch()
    const nav = useNavigate()
    return (
        <div>
            <div className="p-2 flex gap-4">
                <input type="text" 
                className="p-2 outline-none rounded-lg border-gray-500 border-[1px]"
                placeholder="Nhập code , tiêu đề"
                />
                <button
                className="px-4 py-2 outline-none rounded-lg bg-blue-600 text-white"
                >Xác nhận</button>
            </div>
           
            <div className="grid grid-cols-5 gap-4 p-4">
                {(isGetVoucherPromotion === false && payloadGetVoucherPromotion) ? payloadGetVoucherPromotion.map((item) => (
                    <div className="m-2 p-2 border border-gray-300 rounded-lg group">
                        <div className="justify-between flex flex-col items-start">
                            <h2 className="font-bold">Tiêu đề : {item?.promotionTitle}</h2>
                            <span className="text-base">Code : {item?.discountCode}</span>
                            <div className="flex gap-5 text-xs">
                                <p className="text-nowrap">{formatDateCountDown(item?.readAt)}</p>
                                <p className="text-nowrap">User: {item?.totalUser}</p>
                            </div>
                        </div>
                    <button
                    className="bg-gray-200 flex justify-center w-full p-2 rounded-sm transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    key={item._id}
                    onClick={() => {
                        // console.log(item);
                        dispatch(setPayLoadEditVoucher(item))
                        nav(`?s=edit&voucherId=${item._id}&isEdit=false`)
                    }}
                    >Cập nhật</button>
                    </div>
                ))
                    : <div>Loading ...</div>}
            </div>
        </div>

    );
}

export default VoucherAllUser;