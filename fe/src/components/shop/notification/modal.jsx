import { useSelector } from "react-redux";
import { Link } from "react-router";

const ModalNotification = () => {
    const { isAuthenticated, user } = useSelector(state => state.shoppingAuth)
    const {isGetVoucherPromotion , payloadGetVoucherPromotion} = useSelector(state => state.shoppingProduct)
    console.log(isGetVoucherPromotion ,payloadGetVoucherPromotion);
    
    return (
        <div className="w-[400px] h-[400px] bg-white drop-shadow-md rounded-md absolute top-5 right-5 z-10 flex flex-col justify-between">
            {isAuthenticated === true && user !== null
                ?
                <div>
                    {(isGetVoucherPromotion === false && payloadGetVoucherPromotion !== null )
                     ? 
                     <div>
                        {payloadGetVoucherPromotion?.map((item) => {
                            return (
                                <div key={item?._id} className="p-2 border-b border-gray-300">
                                    <h3 className="font-be text-[15px]">{item?.promotionTitle}</h3>
                                    <p>{item?.promotionDescription}</p>
                                </div>
                            )
                        })}
                      
                     </div>
                     : 
                    <div> Bạn chưa có voucher nào </div>}

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