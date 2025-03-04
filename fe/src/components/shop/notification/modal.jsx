import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { chatMessage } from "../chat/details";

const ModalNotification = ({ dataNotification }) => {
    // console.log(dataNotification);

    const { isAuthenticated, user } = useSelector(state => state.shoppingAuth)
    const { isGetVoucherPromotion, payloadGetVoucherPromotion } = useSelector(state => state.shoppingProduct)
    const [payload, setPayload] = useState()
    // console.log(isGetVoucherPromotion ,payloadGetVoucherPromotion , isAuthenticated , user);
    // useEffect(() => {

    //   if (isAuthenticated === true && user !== null && isGetVoucherPromotion === false && payloadGetVoucherPromotion !== null && payloadGetVoucherPromotion?.length !== 0) {
    //     setPayload(pre => [...pre,...payloadGetVoucherPromotion])
    //   }
    // }, [])
    // useEffect(() => {
    //     setPayload(pre => [...pre,...dataNotification])
    // }, [chatMessage,isGetVoucherPromotion])
    
    // console.log( payloadGetVoucherPromotion , isGetVoucherPromotion);


    return (
        <div className="w-[400px] h-[420px] bg-white drop-shadow-md rounded-md absolute top-5 right-5 z-10 flex flex-col justify-between">
            {isAuthenticated === true && user !== null
                ?
                <div>
                    {(isGetVoucherPromotion === false && payloadGetVoucherPromotion !== null && payloadGetVoucherPromotion?.length !== 0)
                        ?
                        <div>
                            {dataNotification?.sort((a, b) => b?.readAt - a?.readAt).slice(0, 4).map((item, index) => {
                                return (
                                    <div key={index} className="p-2 border-b border-gray-300 flex gap-2 ">
                                        <img
                                            className="w-20 h-20 object-contain"
                                            src={item?.promotionImage} alt="anh thong bao" />
                                        <div>
                                            <h3 className="font-be text-[15px]">{item?.promotionTitle}</h3>
                                            <p>{item?.promotionDescription}</p>
                                        </div>

                                    </div>
                                )
                            })}

                        </div>
                        :
                        <div className="text-center flex items-center justify-center"> Bạn chưa có voucher nào </div>}

                </div>
                :
                <div className=" flex items-center flex-col justify-between h-full">
                    <div className="flex flex-col items-center">
                        <img
                            className="w-40 h-40 object-contain"
                            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/fc9c8de0048cfefe.png" alt="" />
                        <p>Ban phai dang nhap su dung tinh nang nay</p>

                    </div>

                    <div className="p-2 flex gap-2">
                        <button
                            onClick={() => nav("/shop/login")}
                            className="bg-red-400 rounded-lg p-2 text-white"
                        >Dang nhap</button>
                        <button
                            onClick={() => nav("/shop/register")}
                            className="bg-red-400 rounded-lg p-2 text-white"
                        >Dang ky</button>
                    </div>
                </div>
            }
            <Link
                to={'/shop/profile/notifications/promotion'}
                className="w-full p-2 text-[14px] border-[1px]  flex justify-center items-center"
            >Xem tất cả</Link>
        </div>
    );
}

export default ModalNotification;