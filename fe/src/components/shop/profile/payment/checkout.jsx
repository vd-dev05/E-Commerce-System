import { toast } from "@/hooks/use-toast";
import { formatPriceUSD } from "@/lib/utils";
import { checkAuthUser } from "@/store/Shop/auth";
import { orderCoinPayPal } from "@/store/Shop/users";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
const initialOptions = {
    clientId: "AQDghmw_Z8JaQEQeI3cKylU10zpUNx0VZxz26_N_OXbg7UOnnF2cbkQJBeMEXfucjJkpampJBJk8gByL",
    // Add other options as needed
};

const styles = {
    shape: "rect",
    layout: "vertical",
    label: "paypal",
    // pill: true
};

const CheckOutPayment = () => {
    const arrPrice = [
        { id: 1, label: '200.000đ', value: 200000 },
        { id: 2, label: '300.000đ', value: 300000 },
        { id: 3, label: '400.000đ', value: 400000 },
        { id: 4, label: '500.000đ', value: 500000 },
        { id: 5, label: '600.000đ', value: 600000 },
        { id: 6, label: '700.000đ', value: 700000 },
    ]
    const [price, setPrice] = useState()

    const dispatch = useDispatch()
    const {isSuccessCoin } = useSelector(state => state.shoppingProduct)
    
    useEffect(() => {
        if ( isSuccessCoin === true) {
            
            setTimeout(() => {
                toast({
                    title: 'Thanh toán thanh cong voi paypal',
                    status: 'success'
                }) 
            }, 2000);
            nav('/shop/profile/payment')
        }
    }, [isSuccessCoin])
    
   
    
    const priceUSD = (price / 25000)
    const nav = useNavigate()
    
    return (
        <div className="px-5">
            <div className="flex justify-between">
                <Link to={'/shop/profile/payment'}>
                    Tro ve e-com xu
                </Link>
                <h1 className="text-xl font-bold text-center">
                    Nạp tiền với phương thức
                </h1>
                <div> </div>

            </div>
            <div className="flex flex-col w-[400px] gap-2">
                <p>Chon menh gia</p>
                <div className="grid grid-cols-2 gap-2">
                    {arrPrice.map((item, index) => (
                        <div key={item.id}
                            className=""
                            onClick={() => setPrice(item.value)}
                        >
                            <input type="radio" name="price" id="" />
                            <label htmlFor="">{item.label}</label>
                        </div>
                    ))}
                </div>
                <p>Hoac nhap menh gia</p>
                <input type="number" name="" id=""
                    value={price}
                    placeholder="nhap menhgia"
                    onChange={e => setPrice(e.target.value)}
                    className="p-2 border-2 border-black outline-none  rounded-sm"
                />


            </div>
            <div id="paypal-button-container"></div>
            <button
                className="bg-black text-white p-2 rounded-sm"
            >Nạp tiền</button>
            <div>
                <PayPalScriptProvider options={initialOptions}>

                 <PayPalButtons
                        onClick={() => 
                        {if (!price) {
                            toast({
                                title: 'Vui long nhap menhgia',
                                status: 'error'
                            })
                        }}
                        }
                        className="w-[400px]"
                        style={{
                            layout: 'vertical', // Kiểu hiển thị của nút (có thể là 'horizontal' hoặc 'vertical')
                            color: 'blue',      // Màu sắc của nút
                            shape: 'rect',      // Hình dáng của nút (có thể là 'rect' hoặc 'pill')
                            label: 'checkout',  // Tiêu đề của nút (checkout, pay, buynow, etc.)
                        }}
                        createOrder={(data, actions) => {
                            
                            if (!priceUSD || priceUSD <= 0 || priceUSD === undefined || null || isNaN(priceUSD))  {
                                return null
                            }
                            // Tạo đơn hàng khi người dùng nhấn nút
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        value:priceUSD, // Số tiền thanh toán
                                    },
                                }],
                            });
                        }}
                        onApprove={(data, actions) => {
                            
                            // Khi thanh toán được phê duyệt, xử lý đơn hàng
                            return actions.order.capture().then(function (details) {
                                const data  ={
                                    amount: details.purchase_units[0].amount.value,
                                    date: details.create_time,
                                    status: details.status,
                                    orderId: details.id
                                }
                                dispatch( orderCoinPayPal(data) )
                                // console.log(isSuccessCoin);
                                
                              
                            });
                        }}
                    ></PayPalButtons> 
                </PayPalScriptProvider>
            </div>
            <div>
                <button>Nạp qua momo</button>
            </div>
            <div>
                <button>Nạp qua VietQr</button>
            </div>
        </div>
    );
}

export default CheckOutPayment;