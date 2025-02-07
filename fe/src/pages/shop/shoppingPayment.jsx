import { editAddress, getAlladdress } from "@/store/Shop/users";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import React from 'react';
import { message, Modal } from 'antd';
import { Button } from "@/components/ui/button";

const ShoppingPayment = () => {
    const dispatch = useDispatch()
    const { isAddress, addressPaydata, isUpdateAddress,addressMessage } = useSelector(state => state.shoppingProduct)
    const [addressDefault,setaddressDefault] = useState(  )
    const [selectedAddress, setSelectedAddress] = useState('')
    useEffect(() => {
        dispatch(getAlladdress())
        if (  isAddress === true) {
            const data = addressPaydata?.find((item) => item.is_default === true)
            setaddressDefault(data)
        }
     
    }, [dispatch])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        handleUpdateStatus(selectedAddress, false)

        if (isAddress === true) {
            setaddressDefault(addressPaydata?.find((item) => item.is_default === true))
            setIsModalOpen(false);
        }
        
        // if (selectedAddress !== undefined || selectedAddress !== null) {
        //     handleUpdateStatus(selectedAddress, true)

        //     setIsModalOpen(false);
        // } else {
        //     message.error("Hay nhap dia chi mac dinh")
        // }

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleUpdateStatus = (id, status) => {
        // console.log(status);
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
        if (isUpdateAddress === true) message.success(addressMessage);
        // if (isUpdateAddress === false) message.error(addressMessage);
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
                        <h2 className="flex gap-2 text-red-500 text"><span><MapPin /></span>Địa Chỉ Nhận Hàng</h2>
                        <div className="">
                            {addressDefault && isAddress === true && (
                                <div className="flex gap-10  items-center">
                                    <div className="flex gap-3">
                                        <h3 className="font-bold text-xl">{addressDefault?.name}</h3>
                                        <p>{addressDefault?.phone}</p>
                                        <p>{addressDefault?.country}</p>
                                        <p>{addressDefault?.address}</p>

                                    </div>
                                    <div>
                                        <button onClick={showModal} className=" hover:underline text-gray-600 text-xs rounded">Thay Dổi</button>
                                    </div>
                                </div>


                            )}
                        </div>
                    </div>
                </section>
                <section className="bg-slate-50">
              
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
                            <input type="radio" name="address" value={address._id} checked={selectedAddress === address._id} onChange={(e) => setSelectedAddress(e.target.value)} />
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
