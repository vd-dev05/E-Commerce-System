import queryString from "query-string";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Trash } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
const VoucherEditUser = () => {
    const location = useLocation()
    const query = queryString.parse(location.search)
    const [isHover, setIsHover] = useState(false)
    const { payloadEditVoucher } = useSelector(state => state.adminAuth)

    useEffect(() => {
        if (query.s === 'edit') {
            setIsHover(false)
        }
        if (query.voucherId && query.isEdit) {
            setIsHover(true)

        } else {
            setIsHover(false)
        }
    }, [query])

    const options = payloadEditVoucher?.readStatus.map((item, index) => ({
        label: item.userID,
        value: item.read ? 'true' : `false`,
    }));

    return (
        <div className="p-2">
            <h2 className="text-2xl font-bold">Edit Voucher  </h2>
            <div>
                {isHover === true && payloadEditVoucher
                    ?
                    <form className="bg-white p-4 rounded-lg shadow-lg">
                        <AlertDialog>
                            <AlertDialogTrigger
                                className="text-red-500 hover:text-red-700 flex items-center gap-2 border-2 border-red-500 text-xs p-2 rounded-sm"
                            ><span><Trash size={14} /></span>Xóa Voucher này</AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Bạn chắc chắn xóa chứ ?</AlertDialogTitle>
                            
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <div className="grid grid-cols-2 gap-4 mt-2">

                            <div className="flex flex-col">
                                <label htmlFor="promotionTitle" className="text-gray-700">Tiêu đề</label>
                                <input type="text" className="p-2 outline-none rounded-lg border-gray-500 border-[1px] mt-1" id="promotionTitle" defaultValue={payloadEditVoucher?.promotionTitle} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="promotionDescription" className="text-gray-700">Mô tả</label>
                                <input type="text" className="p-2 outline-none rounded-lg border-gray-500 border-[1px] mt-1" id="promotionDescription" defaultValue={payloadEditVoucher?.promotionDescription} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="discountCode" className="text-gray-700">Mã giảm giá</label>
                                <input type="text" className="p-2 outline-none rounded-lg border-gray-500 border-[1px] mt-1" id="discountCode" defaultValue={payloadEditVoucher?.discountCode} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="startDate" className="text-gray-700">Ngày bắt đầu</label>
                                <input type="datetime-local" className="p-2 outline-none rounded-lg border-gray-500 border-[1px] mt-1" id="startDate" defaultValue={new Date(payloadEditVoucher?.startDate).toISOString().slice(0, 16)} />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="endDate" className="text-gray-700">Ngày kết thúc</label>
                                <input type="datetime-local" className="p-2 outline-none rounded-lg border-gray-500 border-[1px] mt-1" id="endDate" defaultValue={new Date(payloadEditVoucher?.endDate).toISOString().slice(0, 16)} />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-gray-700">User</label>
                                <div className="flex gap-2 mt-1">
                                    {/* <span className="flex flex-wrap">
                                        UserID: {payloadEditVoucher?.readStatus?.map(status => status.userID).join(', ')}
                                    </span>
                                    <span className="flex items-center">
                                        Read: {payloadEditVoucher?.readStatus?.every(status => status.read) ? 'Yes' : 'No'}
                                    </span> */}
                                    <select className="p-2 outline-none rounded-lg border-gray-500 border-[1px] mt-1" >
                                        {options.map((item, index) => (
                                            <option key={index} value={item.value}>
                                                {item.label}-{item.value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
                                Xác Nhận Đổi
                            </button>
                        </div>
                    </form>
                    : <div>Chưa có voucher cập nhật hãy chọn đi</div>}
            </div>

        </div>
    );
}

export default VoucherEditUser;