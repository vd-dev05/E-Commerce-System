import { formatDate, formatPrice } from "@/lib/utils";
import { getOrderPaymentProcess } from "@/store/Shop/users/userThunk";
import queryString from "query-string";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

const OrderProfile = () => {
    let DataFake = []
    const location = useLocation();
    const query = queryString.parse(location.search);
    const dispatch = useDispatch()
    const {payloadPaymentProcess ,isPaymentProcess , payloadTotalPaymentProcess } = useSelector(state => state.shoppingProduct)

    useEffect(() => {
        dispatch(getOrderPaymentProcess())
        // if (payloadPaymentProcess)
    }, [])
    if (payloadPaymentProcess)

    return ( 
        <div>
            <div className="flex justify-between px-5">
                {/* roure  */}
                <Link 
                to={'?id=allin'}
                >Tất cả <span>({payloadTotalPaymentProcess   ? payloadTotalPaymentProcess : 0})</span></Link>
                <Link 
                to={'?id=notbuy'}
                >Chờ thanh toán   </Link>
                <Link
                to={'?id=success'}
                >Đã Đặt </Link>
                <Link
                to={'?id=progess'}
                >Chờ Xác Nhận </Link>
                <Link
                to={'?id=shiping'}
                >Đang vận chuyển</Link>
                <Link
                to={'?id=shipsuccess'}
                >Giao hàng thành công</Link>
                <Link
                to={'?id=notTrue'}
                >Đã hủy</Link>
            </div>

            {/* order profile  */}
            <div>
                {
                    isPaymentProcess === false && payloadPaymentProcess?.map(order => (
                        <div key={order._id} className="p-5 border-t border-b border-gray-300">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Link to={`/shop/product/${order.products[0].productId?.name}`} className="text-blue-500">
                                        {order.products[0].productId?.name}
                                    </Link>
                                    <span className="mx-2">x{order.products[0].variants[0].quantity}</span>
                                </div>
                                <span className="text-gray-500">
                                    {formatDate(order.orderDate)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-gray-500">
                                    Tổng tiền:
                                </span>
                                <span className="font-semibold">
                                    {formatPrice(order.totalAmount)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                {/* <span className="text-gray-500">
                                    Phương thức thanh toán:
                                </span>
                                <span className="font-semibold">
                                    {order.paymentMeThod}
                                </span> */}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-gray-500">
                                    Trạng thái:
                                </span>
                                <span className="font-semibold">
                                    {order.isStatus}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>  
        </div>
    );
}
 
export default OrderProfile; 