import { TypingPayment } from "@/hooks/textAmination";
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Link, Outlet } from "react-router";
import Checkout from "./checkout";
import { checkAuthUser } from "@/store/Shop/auth";
import { useEffect, useState } from "react";
import { getCoinPaypal, getCoinTransaction } from "@/store/Shop/users";
import { formatDate, formatPrice, formatTime } from "@/lib/utils";
import { Input, Modal } from "antd";
const initialOptions = {
    "client-id": "5ETH7NFCHQZKN",
    currency: "USD",
    intent: "capture",
};
const PaymentProfile = () => {
    const { user, isAuthenticated } = useSelector(state => state.shoppingAuth)
    const { coinUpdate, coinTransaction, isTransaction } = useSelector(state => state.shoppingProduct)
    const [IsPrice, setIsPrice] = useState(false)
    const handleSelect = (e) => {
        setIsPrice(e.target.value === "usd")
    }


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCoinPaypal())
        dispatch(getCoinTransaction())
    }, [])
    const optionPayment = [{ id: 'paypal', label: 'Paypal' }, { id: 'visa', label: 'Visa' }, { id: 'momo', label: 'Momo' }]

    return (
        <div className="p-5">
            <div className="flex flex-col">
                <h1>Tài khoản Xu</h1>
                <TypingPayment nameUser={user?.username} />
            </div>
            <div className="flex justify-between ">
                <div className="flex ">
                    <p>Số Dư đang có : </p>
                    <span>{IsPrice ? coinUpdate : formatPrice(coinUpdate * 25000)}</span>
                    <select name="" id="" onChange={handleSelect}>
                        <option value="vnd">VND</option>
                        <option value="usd">USD</option>
                    </select>
                </div>
                <div>
                    <Link
                        to={'/shop/profile/payment/checkout'}
                    >
                        Nạp ngay
                        {/* <PayPalScriptProvider options={initialOptions}>
                            <Checkout />
                        </PayPalScriptProvider> */}
                    </Link>


                </div>

            </div>
            <div className="flex justify-between">
                <h2>Lich su nap</h2>
                <div>
                    {/* tra cuu lich su nap */}
                    {/* <button onClick={showModal}>Tra cứu lịch sử nạp</button> */}
                    <Modal
                        title="Tìm kiếm lịch sử nạp"
                        // visible={isModalVisible}
                        // onCancel={handleCancel}
                        footer={null}
                    >
                        <Input
                            placeholder="Nhập từ khóa tìm kiếm"
                            // value={searchTerm}
                            // onChange={handleSearch}
                        />
                        {/* Add search results here */}
                    </Modal>
                </div>
            </div>
            <div className="flex flex-col justify-between  p-5 gap-y-4">
                {isTransaction === true ? coinTransaction?.transitions.map((item, index) => (
                    <div key={index} className="flex justify-between flex-col drop-shadow-md bg-white p-5 rounded-lg">
                        <div> <h3>Nap qua phuong thuc <span>{optionPayment.find((i) => i.id === item.type)?.label}</span></h3></div>
                        <div className="flex justify-between w-full">
                            <div className="flex gap-5">
                                <span>{formatTime(item.date)}</span>
                                <span>{formatDate(item.date)}</span>
                            </div>
                            <span>+ {IsPrice ? item.coin + ' USD' : formatPrice(item.coin * 25000) + ' VND'}  </span>
                        </div>
                    </div>
                )) : "Loading ..."}
                {/* <div className="flex justify-between w-full">
                    <h3>Nap qua pay pal</h3>
                    <span>+ 100 USD</span>
                </div>
                <div className="flex gap-5">
                <span>4 :00 h</span>
               <span>1-12-2021 </span>

                </div> */}

            </div>

        </div>
    );
}

export default PaymentProfile;