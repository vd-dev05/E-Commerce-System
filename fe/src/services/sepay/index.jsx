import { toast } from "@/hooks/use-toast";
import { formatPrice, formatTime } from "@/lib/utils";
import { clearDataTransition } from "@/store/Shop/users";
import { createOrderPaymentSepay, editPaymentOrder, orderCoinPayPal, removeToCartProduct } from "@/store/Shop/users/userThunk";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const SepayQr = () => {
    axios.defaults.withCredentials = false;
    const [isLoading, setIsLoading] = useState(true);

    const [qrImageUrl, setQrImageUrl] = useState("");
    const dispatch = useDispatch()
    const payloadTransaction = localStorage.getItem('qrData')
    const [data, setData] = useState(null);
    const [time, setTime] = useState(null);
    const [code, setCode] = useState(null)
    const { isSuccessSepay, payloadSepay, payloadMessageSepay } = useSelector(state => state.shoppingProduct)
    // console.log(payloadTransaction);
    const nav = useNavigate()
    useEffect(() => {

        if (!payloadTransaction) {
            window.location.href = '/shop/cart'
        }
        setData(JSON.parse(payloadTransaction))

        const intervalId = setInterval(() => {
            setTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);

    }, [payloadTransaction]);
    useEffect(() => {
        if (time > 0 && code) {
            console.log("Đã gửi dữ liệu");
            dispatch(createOrderPaymentSepay("DH0168")).then(payload => {

                if (isSuccessSepay === true && payloadMessageSepay === "Chuyển khoản thành công") {  
                 
                    const payload = {
                        paymentMeThod:  "qrcode",
                        paymentSuccess: true,
                        address: JSON.parse(payloadTransaction).dataOrder.address ,
                        totalAmount: data.amount + 10000
                    }
                 
                    dispatch(removeToCartProduct(JSON.parse(payloadTransaction).payloadOrderProduct.products[0]))
                    dispatch(editPaymentOrder({ id: JSON.parse(payloadTransaction).dataOrder._id, data : payload })).then(msg => {
                        toast({
                            title: 'Thanh toan thanh cong',
                            status: 'success'
                        })
                        nav('/shop/profile/purchase')
                        dispatch(clearDataTransition())
                    
                    })
                    
                }

            })
        }
    }, [time, code, dispatch]);
    useEffect(() => {
        if (data !== null && payloadTransaction) {
            (
                async () => {
                    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_PAYMENT_SEPAY}/payment/create?amount=${data.amount + 10000}`)
                    if (response.status === 200) {

                        setQrImageUrl(response.data.image)
                        setCode(response.data.code)
                        setTime(180)
                        setIsLoading(false);
                    }
                }
            )()
        }
    }, [data, payloadTransaction])

    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = qrImageUrl;
        a.download = 'qr_code.png';
        a.click();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className=" items-center sm:flex justify-center px-4 py-10 sm:px-16 sm:py-20 gap-5 min-h-screen">
            <div className="flex flex-col items-center text-center">
                <h1
                    // onClick={fetechImage}
                    className="text-3xl sm:text-4xl text-green-500 font-bold mb-4 text-nowrap">Đặt hàng Thành Công</h1>
                {/* <p className="text-lg sm:text-xl mb-2">Mã Đơn Hàng: DH<span>{parsedTotal.orderId}</span></p> */}
                <img
                    src={qrImageUrl}
                    alt="QR Code"
                    className="img-fluid max-w-[250px] sm:max-w-[350px] mb-4"
                />
                <button
                    className="btn btn-primary bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-200"
                    onClick={handleDownload}
                >
                    Tải ảnh QR
                </button>
            </div>

            <div className="w-full mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Thông tin đơn hàng</h2>
                    <p>Thời gian hết hạn đơn hàng : {`${Math.floor(time / 60)} phút ${time % 60} giây`}</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-3 px-5 border-b text-left text-sm sm:text-base">Ngân hàng MBBank</th>
                                <th className="py-3 px-5 border-b text-left text-sm sm:text-base">Thuế</th>
                                <th className="py-3 px-5 border-b text-left text-sm sm:text-base">Mã code xác thực</th>
                                {/* <th className="py-3 px-5 border-b text-left text-sm sm:text-base">Chỗ đặt </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-3 px-5 border-b text-sm sm:text-base">E-Commerce-Sytem</td>
                                <td className="py-3 px-5 border-b text-sm sm:text-base">10.000 đ</td>
                                <td className="py-3 px-5 border-b text-sm sm:text-base">{data && localStorage.getItem('qrData') ? code : ''}</td>
                                {/* <td className="py-3 px-5 border-b text-sm sm:text-base">{parsedTotal.seats}</td> */}
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="py-3 px-5 border-t text-sm sm:text-base">Tổng tiền </td>
                                <td className="py-3 px-5 border-t text-sm sm:text-base text-nowrap">{data && localStorage.getItem('qrData') ? formatPrice(data.amount + 10000) : ''}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SepayQr;