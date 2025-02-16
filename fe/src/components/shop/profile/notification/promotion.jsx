import { formatDateCountDown } from "@/lib/utils";
import { useSelector } from "react-redux";

const NotificationUserPromotion = () => {
    const { isGetVoucherPromotion, payloadGetVoucherPromotion } = useSelector(state => state.shoppingProduct)

   

    return (
        <div className="p-5 w-full">
            <div className="w-full flex items-end justify-end bg-stone-100 p-2">
                <button
                >Đánh dấu đã đọc tất cả</button>
            </div>
            <div className="bg-[#fff1ee]">
                {(isGetVoucherPromotion === false && payloadGetVoucherPromotion) ? payloadGetVoucherPromotion?.map((item) => (
                    <div className="flex p-2 gap-5">

                        <img
                            className="w-32 h-32 object-cover"
                            src="https://res.cloudinary.com/dlpxfxpdn/image/upload/v1739262930/avatar/undefined-1739262931884.jpg" alt="" />
                        <div className="flex flex-col gap-3">
                            <h2 className="font-medium">{item?.promotionTitle}</h2>
                            <div className="flex flex-col gap-2">
                            <p className="text-[14px]">{item?.promotionDescription}</p>
                            <span className="text-[12px]">{ item.readAt ? formatDateCountDown(item?.readAt) : 0}</span>
                            </div>
                          
                        </div>
                    </div>
                )) : <div> ko san pham nao </div>}

            </div>
        </div>
    );
}

export default NotificationUserPromotion;