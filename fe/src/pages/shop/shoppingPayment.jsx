import { editAddress, editPaymentOrder, getAlladdress, getCoinPaypal, getOrderProductId } from "@/store/Shop/users/userThunk";
import { onpopstate, setDataTransition } from "@/store/Shop/users";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, Link, useLocation, useNavigate } from "react-router";
import React from 'react';
import { message, Modal, Tooltip } from 'antd';
import { Button } from "@/components/ui/button";
import { formatPrice, formatTitleLenght, generateUniqueId } from "@/lib/utils";
import { useSearchParams } from 'react-router-dom'
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { initialOptionsPayPal } from "@/config";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';

const ShoppingPayment = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { isAddress, addressPaydata, isUpdateAddress, addressMessage, isOrder, payloadOrderProduct, isLoadingOrderProduct, coinUpdate, isPaymentSuccess, payloadPaymentSuccess } = useSelector(state => state.shoppingProduct)
    // const [addressDefault, setaddressDefault] = useState()
    const [selectedAddress, setSelectedAddress] = useState('')
    const [searchParams] = useSearchParams();
    const isStatus = searchParams.get('payment');
    const [currentPaymentMethod, setCurrentPaymentMethod] = useState(isStatus); // Lưu trữ trạng thái isStatus từ URL
    const [options, setOptions] = useState(isStatus);
    const [isPayment, setIsPayment] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const nav = useNavigate()

    // console.log(payloadPaymentSuccess ,isPaymentSuccess);

    // console.log(isAddress,addressPaydata);

    useEffect(() => {
        // console.log(isPaymentSuccess, payloadPaymentSuccess);

        if (isPaymentSuccess === true && payloadPaymentSuccess === "Update order success") {
            setTimeout(() => {
                message.success("Chuyển Hướng Tới Trang Đơn Hàng Đã Thanh Toán ")
                nav('/shop/profile/purchase')
            }, 2000);

        }

    }, [isPaymentSuccess, payloadPaymentSuccess, dispatch])


    useEffect(() => {
        const paymentMethodFromUrl = searchParams.get('payment');
        setCurrentPaymentMethod(paymentMethodFromUrl); // Cập nhật trạng thái isStatus khi URL thay đổi
    }, [searchParams]);

    useEffect(() => {
        if (isAddress === false && addressPaydata === null) {
            dispatch(getAlladdress())
            dispatch(getCoinPaypal())
        }

    }, [isAddress, addressPaydata, dispatch])

    useEffect(() => {
        if (isOrder === false && payloadOrderProduct === null) {
            const pathname = location.pathname.split('/shop/checkout/')[1]
            if (!pathname) {
                window.location.href("/shop/home")
            }
            dispatch(getOrderProductId(pathname))
        }
    }, [isOrder, payloadOrderProduct])


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        // setIsLoading(!isLoading)
        handleUpdateStatus(selectedAddress, false)

        if (isAddress === true) {
            setIsModalOpen(false);
        }

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleUpdateStatus = (id, status) => {

        if (status === true) {
            message.error('Vui lòng chọn 1 địa chỉ mặc định');
            return
        }
        dispatch(editAddress({
            userId: id, data: {
                is_default: true,
                status: false
            }
        }))
        if (isUpdateAddress === true) {
            message.success(addressMessage);

        }


    }
    useEffect(() => {
        const handlePopstate = () => {
            dispatch(onpopstate());
        };
        window.addEventListener("popstate", handlePopstate);
        return () => {
            window.removeEventListener("popstate", handlePopstate);
        };
    }, [dispatch]);

    const handlePayment = (e) => {
        setIsLoading(true)
        const value = e.target.value

        setOptions(value)
        const url = new URL(window.location.href)
        url.searchParams.set('payment', value)
        window.history.pushState({}, '', url.toString())

        setCurrentPaymentMethod(value);
        setIsLoading(false)
    }
    const totalAmount = payloadOrderProduct?.products.reduce((total, product) => {
        product.variants.forEach(variant => {
            total += variant.quantity * product.salePrice;
        });
        return total;
    }, 0);

    const paymentMethod = () => {
        let result = '';
        const checkQuery = ["momo", "cod", "paypal", "qrcode"].includes(currentPaymentMethod)
        if (currentPaymentMethod === "bank_ecom") {
            result = formatPrice(Math.max(0, coinUpdate - totalAmount));
        } else if (checkQuery) {
            result = formatPrice(totalAmount);
        } else if (!checkQuery) {
            const url = new URL(window.location.href)
            url.searchParams.set('payment', "cod")
            window.history.pushState({}, '', url.toString())
            result = formatPrice(totalAmount);
        }
        return result;
    }

    useEffect(() => {
        paymentMethod()
    }, [isStatus, currentPaymentMethod])

    const productPrice = () => {
        let price = 0

        payloadOrderProduct?.products.forEach(product => {
            product.variants.forEach(variant => {
                price += variant.priceBeta;
            });
        })
        return price
    }
    // console.log(productPrice());


    const productPriceSale = () => {
        let price = 0

        payloadOrderProduct?.products.forEach(product => {
            product.variants.forEach(variant => {
                price += product.salePrice;
            });
        })
        return price
    }
    const { transition } = useSelector(state => state.shoppingProduct)

    const handlePaymentPaid = () => {
        
        if (options === "qrcode" && totalAmount) {
            const map = addressPaydata.filter((item) => item.is_default === true)

            const dataOrder = {
                _id : payloadOrderProduct._id,
                address: map[0].address,
                paymentMeThod: "qrcode"
            }
           
            dispatch( setDataTransition({
                amount : totalAmount,
                dataOrder
            }))

            nav('/payment/sepay')

        }



    }
    return (
        <div>
            <header>
                <div className="p-10 flex items-center gap-5 drop-shadow-lg border-b-2">
                    <Link
                        to={"/shop/home"}
                    >
                        <h1 className="text-3xl font-bold">E-Commerce</h1>
                    </Link>
                    <hr className="h-[40px] border-[1px] border-red-500" />
                    <p className="text-lg border-red-500">Thanh toán</p>
                </div>

            </header>
            <main>
                <section className="bg-slate-50">
                    <div className="px-10 py-5 m-10 bg-white drop-shadow-sm">


                        <div className="flex gap-8 items-center"> 
                            <h2 className="flex gap-2 text-red-500 text"><span><MapPin /></span>Địa Chỉ Nhận Hàng</h2>
                            <button onClick={showModal} className="hover:underline text-gray-600 text-xs rounded">Thay Dổi</button>
                        </div>
                        <div className="">
                            {(isAddress === true && addressPaydata) ?
                                <div className="flex gap-10 ">
                                    {
                                        addressPaydata?.filter((item) => item.is_default === true).map((addressDefault, index) => (
                                            < >
                                                <div key={index} className="flex gap-3 items-center py-2">
                                                    <h3 className="font-bold text-xl">{addressDefault?.name}</h3>
                                                    <p>{addressDefault?.phone}</p>
                                                    <p>{addressDefault?.country}</p>
                                                    <p>{addressDefault?.address}</p>
                                                </div>

                                            </>

                                        ))

                                    }

                                </div>
                                : 'Loading'}
                        </div>
                    </div>
                </section>
                <section className="bg-slate-50">
                    <div className="px-10 py-5 m-10 bg-white drop-shadow-sm">
                        <h2 className="flex gap-2 text-red-500 text">Sản phẩm</h2>
                        <table className="w-full text-[15px]">
                            <thead>
                                <tr className="bg-gray-100 grid grid-cols-6 gap-x-2">
                                    <th className=" w-[1/6]"></th>
                                    <th className="col-span-1"></th>
                                    <th className="col-span-1"></th>
                                    <th className="col-span-1">Đơn giá</th>
                                    <th className="col-span-1">Số lượng</th>
                                    <th className="col-span-1">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(isLoadingOrderProduct === false && payloadOrderProduct !== null) ? payloadOrderProduct?.products.map((item) => (
                                    <React.Fragment key={item._id}>
                                        <tr className="grid grid-cols-6 gap-x-2  text-center border-[1px] p-2 my-2">
                                            <td className="col-span-3">
                                                <div className="flex gap-10 w-full text-nowrap">
                                                    <div>
                                                        {/* <img src={item.imag e} alt="" /> */}
                                                    </div>
                                                    <div className="w-[200px] text-left">
                                                        <Tooltip title={item?.productId?.name ? item?.productId?.name : ""}>
                                                            <h2>{formatTitleLenght(item?.productId?.name, 15)}</h2>
                                                        </Tooltip>
                                                    </div>
                                                    <p>
                                                        Loại:
                                                        <span>
                                                            {item.variants[0]?.attributes?.map(({ name, value }) => (
                                                                <span key={name}>{value}, </span>
                                                            ))}
                                                        </span>
                                                    </p>
                                                </div>
                                            </td>


                                            <td className="col-span-1">{item?.price ?? formatPrice(item?.price)}</td>
                                            <td className="col-span-1">{item?.variants[0]?.quantity}</td>
                                            <td className="col-span-1">{formatPrice(item?.salePrice * item?.variants[0]?.quantity)}</td>
                                            <td className="">
                                                <div key={item._id}>
                                                    <div className="py-10 space-x-1 flex text-nowrap items-center">
                                                        <label htmlFor="note">Lời Nhắn</label>
                                                        <input
                                                            id="note"
                                                            className="outline-none border-[1px] border-gray-500 text-[12px] p-2 rounded-sm"
                                                            type="text"
                                                            placeholder="Lưu ý cho người bán"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>

                                )) : 'Loading ..'}
                            </tbody>
                        </table>
               </div>
                </section>
                <section className="bg-slate-50">
                    <div className="px-10 py-5 m-10 bg-white drop-shadow-sm">
                        <div className="flex justify-between">
                            <h2>Phương Thức Thanh Toán</h2>
                            <div>
                                {isStatus && isPayment === false && (
                                    <div className="flex gap-5">
                                        <p>
                                            {isStatus === "bank_ecom" ? "Thanh qua Ví E-com" : ''}
                                            {isStatus === "momo" ? "Thanh toán qua MoMo" : ''}
                                            {isStatus === "cod" ? "Thanh qua tiền mặt" : ''}
                                            {isStatus === "paypal" ? "Thanh toan qua paypal" : ''}
                                            {isStatus === "qrcode" ? "Thanh toan qua qrcode" : ''}
                                        </p>
                                        <button
                                            onClick={() => setIsPayment(true)}
                                        >Thay đổi </button>
                                    </div>
                                )}
                            </div>

                            {isPayment === true &&
                                <div className="flex space-x-2">
                                    {['bank_ecom', 'momo', 'paypal', 'cod', 'qrcode'].map((method, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Checkbox
                                                name="payment"
                                                value={method}
                                                id={method}
                                                checked={options === method}
                                                onClick={handlePayment}
                                            />
                                            <Label htmlFor={method}>
                                                {method === 'bank_ecom' ? 'Ví e-com' :
                                                    method === 'momo' ? 'Momo' :
                                                        method === 'paypal' ? 'Paypal' :
                                                            method === "qrcode" ? 'Thanh toán qua qrcode' : 'Thanh toán khi nhận hàng'}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            }

                        </div>
                    </div>
                    <div className="px-10 py-2 m-10 bg-white drop-shadow-sm flex flex-col gap-2">
                        <div className="flex justify-end flex-col ">
                            <div className="flex flex-col items-end gap-5">
                                <div className="flex gap-10 items-center">
                                    <p className="text-[15px]">Tiền hàng</p>
                                    <span>{payloadOrderProduct && formatPrice(productPrice())}</span>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <p className="text-[15px]">Tiền hàng giảm giá </p>
                                    <span className="line-through text-red-400">{payloadOrderProduct && formatPrice(productPriceSale())}</span>
                                </div>
                                <div className="flex gap-10 items-center">
                                    <p className="text-[15px]">Tổng Thanh toán</p>
                                    <span className="text-xl text-red-400">
                                        {paymentMethod()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-10 py-5 m-10 bg-white drop-shadow-sm flex justify-between">
                        <div>
                            <p>Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Shopee</p>
                        </div>

                        {(isStatus && currentPaymentMethod) === "paypal" ?
                            <PayPalScriptProvider options={initialOptionsPayPal}>

                                <PayPalButtons
                                    onClick={() => {
                                        if (totalAmount) {
                                            // toast({
                                            //     title: 'So tien khong khop',
                                            //     status: 'error'
                                            // }
                                        }
                                    }

                                    }
                                    createOrder={(data, actions) => {
                                        if (!totalAmount || totalAmount <= 0 || totalAmount === undefined || null || isNaN(totalAmount)) {
                                            return null
                                        }
                                        // Tạo đơn hàng khi người dùng nhấn nút


                                        return actions.order.create({
                                            purchase_units: [{
                                                reference_id: "default",
                                                amount: {
                                                    currency_code: 'USD',
                                                    value: totalAmount
                                                },
                                            }],
                                        });
                                    }}
                                    onApprove={(data, actions) => {

                                        // Khi thanh toán được phê duyệt, xử lý đơn hàng
                                        return actions.order.capture().then(function (details) {
                                            // const data = {
                                            //     amount: details.purchase_units[0].amount.value,
                                            //     date: details.create_time,
                                            //     status: details.status,
                                            //     orderId: details.id
                                            // }
                                            // dispatch(orderCoinPayPal(data))

                                            if (details.payment === null) {
                                                toast({
                                                    title: 'Thanh toan khong thanh cong',
                                                    status: 'error'
                                                })
                                            }
                                            if (details?.status === "COMPLETED") {
                                                const defaultAddress = addressPaydata.find(address => address.is_default === true)?.address;
                                                const data = {
                                                    paymentMeThod: "paypal",
                                                    paymentSuccess: true,
                                                    address: defaultAddress,
                                                    totalAmount: totalAmount
                                                }
                                                dispatch(editPaymentOrder({ id: payloadOrderProduct._id, data }))
                                                toast({
                                                    title: 'Thanh toan thanh cong',
                                                    status: 'success'
                                                })
                                            }



                                        });
                                    }}
                                >ĐẶT HÀNG</PayPalButtons>
                            </PayPalScriptProvider>
                            :
                            <button
                                onClick={handlePaymentPaid}
                                className="flex justify-center items-center bg-[#ed4d2d]  w-[200px] p-2 text-white">
                                Đặt hàng
                            </button>
                        }
                    </div>

                </section>
            </main>
            <Modal

                title="Địa Chỉ Của Tôi " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <div className="flex justify-end gap-2">
                        <Button key="back" onClick={handleCancel}>
                            Hủy
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleOk}>
                            Xác Nhận
                        </Button>
                    </div>
                    ,
                ]}
            >
                <div>
                    {addressPaydata?.map((address) => (
                        <div key={address._id} className="flex items-center gap-3 mb-3">
                            {/* <input type="radio" name="address"/> */}
                            <Checkbox value={address._id} checked={selectedAddress === address._id} onClick={(e) => setSelectedAddress(e.target.value)} />
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-xl">{address.name}</h4>
                                    <hr className="border-[1px] h-[20px]" />
                                    <p>{address.phone}</p>
                                </div>


                                <p>{address.address}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </Modal>
        </div>
    );
}

export default ShoppingPayment;


