import AddressSelector from "@/components/ui/selectaddress";
import { createAddress, editAddress, getAlladdress } from "@/store/Shop/users";
import { message, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddressProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [dataAddress, setDataAddress] = useState();
    const [chunkAddress, setChunkAddress] = useState('');
    const [details, setDetails] = useState('');
    const [suggestion, setSuggestion] = useState(false);
    const [data, setData] = useState({
        id: '',
        name: '',
        phone: '',
        address: '',
        is_default: false,
        status: false
    });
    const { user, isAuthenticated } = useSelector(state => state.shoppingAuth)
    const { addressPaydata, isAddress, addressMessage, isUpdateAddress } = useSelector(state => state.shoppingProduct)
    const dispatch = useDispatch();
    const showModal = () => {
        setIsModalOpen(true);
    };


    useEffect(() => {
        const province = cities.find(city => city.Id === dataAddress?.cityId);
        const district = province?.Districts.find(district => district.Id === dataAddress?.districtId);
        const ward = district?.Wards.find(ward => ward.Id === dataAddress?.wardId);
        if (province && district && ward) {
            setChunkAddress(`${ward?.Name} , ${district?.Name},${province?.Name} `);
        }

    }, [cities, dataAddress])

    useEffect(() => {
        dispatch(getAlladdress())
    }, [])
    useEffect(() => {
        dispatch(getAlladdress())

    }, [isUpdateAddress === true])

    const handleOk = () => {
        if (details === '') {
            message.error('Vui lòng nhập địa chỉ chi tiết');
            return;
        }
        if (chunkAddress !== undefined && details !== '') {
            dispatch(createAddress({ address: details + ',' + chunkAddress, phone: data.phone, name: data.name }));
        }
        if (isUpdateAddress === true) {
            setData({
                name: '',
                phone: '',
                is_default: false,
                status: false
            })
            setDetails('');
            message.success(addressMessage);
            setIsModalOpen(false);
        }
        if (isUpdateAddress === false) message.error(addressMessage);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalOpenEdit(false);
        setData({
            name: '',
            phone: '',
            is_default: false,
            status: false
        })
        setDetails('');
    };
    const handleEdit = (id) => {
        setIsModalOpenEdit(true);
        setData(pre => ({ ...pre, id: id }))

    }
    const handleInputChange = (e) => {
        const value = e.target.value;
        const newValue = value.replace(/<|>|&|"/g, '');
        setData(prev => ({ ...prev, [e.target.id]: newValue }));
    }
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
        <div className="p-5">
            <div className="flex justify-between px-20 py-5">
                <h3>Địa chỉ của tôi</h3>
                <button
                    onClick={showModal}
                    className="bg-zinc-500 text-white px-5 py-2 rounded-lg"
                > + Them dia chi</button>
            </div>

            <div>
                <div className="flex justify-between px-20 py-5 flex-col gap-5">
                    {isAddress === true && addressPaydata.map((address, index) =>
                        <div className="flex   justify-between w-full drop-shadow-lg bg-slate-50 p-5">
                            <div>
                                {address?.is_default === true ? <h3 className="font-bold border-2  w-fit">Địa chỉ mặc định</h3> : <h3>Địa chỉ thường</h3>}
                                <p>{address?.name}</p>
                                <p> SDT : <span>{address?.phone}</span></p>
                                <p>Địa chỉ: <span>{address?.address}</span></p>
                            </div>
                            <div className="flex flex-col justify-between">
                                <button
                                    onClick={() => handleEdit(address._id)}
                                    className="bg-zinc-500 text-white px-5 py-2 rounded-lg"
                                >Chỉnh sửa</button>
                                <button
                                    onClick={() => handleUpdateStatus(address._id, address.is_default)}
                                    className="bg-red-500 text-white px-5 py-2 rounded-lg"
                                >Chon làm địa chỉ mặc định</button>
                            </div>
                            <Modal
                                title="Chinh sua dia chi"
                                open={isModalOpenEdit}
                                footer={[
                                    <div className="space-x-5">
                                        <button key="back" className="bg-zinc-500 text-white px-5 py-2 rounded-lg" onClick={handleCancel}>
                                            Hủy
                                        </button>,
                                        <button
                                            onClick={() => {

                                                const payload = {
                                                    name : data.name,
                                                    phone : data.phone,
                                                    address : details,
                                                    status : true
                                                }
                                                // // console.log(payload);

                                                dispatch(editAddress({data : payload , userId : data.id}))
                                                if (isUpdateAddress === true) {
                                                    message.success(addressMessage);
                                                    setIsModalOpenEdit(false);
                                                    setData({
                                                        name: '',
                                                        phone: '',
                                                        is_default: false,
                                                        status: false
                                                    })
                                                    setDetails('');
                                                }

                                            }}
                                            key="submit" className="bg-red-500 text-white px-5 py-2 rounded-lg" type="primary">
                                            Xác nhận
                                        </button>
                                    </div>
                                    ,
                                ]}
                            >
                                <div className="grid grid-cols-2 gap-5">
                                    <input
                                        type="text"
                                        placeholder="Họ và tên"
                                        className="p-2 border-2 border-black w-full rounded-lg"
                                        onChange={(e) => setData(prev => ({ ...prev, name: e.target.value.replace(/<|>|&|"/g, '') }))}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Số điện thoại"
                                        className="p-2 border-2 border-black w-full rounded-lg"

                                        onChange={(e) => setData(prev => ({ ...prev, phone: e.target.value.replace(/<|>|&|"/g, '') }))}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Địa chỉ chi tiết"
                                        className="p-2 border-2 border-black w-full rounded-lg"
                                        onChange={(e) => setDetails(e.target.value.replace(/<|>|&|"/g, ''))}
                                    />
                                </div>
                            </Modal>
                        </div>

                    )}
                    {/* <div className="flex   justify-between w-full drop-shadow-lg bg-slate-50 p-5">
                        <div>
                            <h3 className="font-bold border-2  w-fit">Địa chỉ mặc định</h3>
                            <p>Nguyễn Văn A</p>
                            <p>0123456789</p>
                            <p>Địa chỉ: 123/4/5 Nguyễn Văn Linh, Quận 7, TP.HCM</p>
                        </div>
                        <div className="flex flex-col justify-between">
                            <button
                                className="bg-zinc-500 text-white px-5 py-2 rounded-lg"
                            >Chỉnh sửa</button>
                            <button
                                className="bg-red-500 text-white px-5 py-2 rounded-lg"
                            >Chon</button>
                        </div>

                    </div> */}


                </div>
            </div>

            <Modal
                title="Them dia chi"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <div className="space-x-5">
                        <button key="back" className="bg-zinc-500 text-white px-5 py-2 rounded-lg" onClick={handleCancel}>
                            Hủy
                        </button>,
                        <button key="submit" className="bg-red-500 text-white px-5 py-2 rounded-lg" type="primary" onClick={handleOk}>
                            Xác nhận
                        </button>
                    </div>
                    ,
                ]}
            >
                <div className="flex flex-col gap-5">
                    <div className="flex justify-between w-full gap-5">
                        <div className="flex flex-col w-full">
                            <input
                                placeholder="Ho va Tên"
                                className="border-2 border-black-50 w-full p-2"
                                value={data.name}
                                onChange={handleInputChange}
                                type="text" id="name" />
                        </div>
                        <div className="flex flex-col w-full relative">
                            <input
                                value={data.phone}
                                onChange={handleInputChange}
                                placeholder="Số điện thoại"
                                onFocus={() => {
                                    if (user.phone && isAuthenticated === true) {
                                        setSuggestion(true);
                                    }

                                }}
                                onBlur={() => {
                                    setSuggestion(false);
                                }}
                                className="border-2 border-black-50 w-full p-2 absolute"
                                type="text" id="phone" />
                            {suggestion === true &&
                                <div className="flex justify-between w-full absolute -bottom-8">
                                    <span>{user.phone}</span>
                                    <button
                                        onClick={() => {
                                            setData(prev => ({ ...prev, phone: user.phone }));
                                            setSuggestion(false);
                                        }}
                                        className="border-2 border-red-300 text-red-500 outline-none p-[2px] rounded-lg"
                                    >Su dung</button>
                                </div>
                            }


                        </div>
                    </div>
                    <div className="my-2">
                        <AddressSelector
                            cities={cities}
                            setCities={setCities}
                            districts={districts}
                            setDistricts={setDistricts}
                            wards={wards}
                            setWards={setWards}
                            selectedCity={selectedCity}
                            setSelectedCity={setSelectedCity}
                            selectedDistrict={selectedDistrict}
                            setSelectedDistrict={setSelectedDistrict}
                            dataAddress={dataAddress}
                            setDataAddress={setDataAddress}
                        />
                    </div>
                    <div>
                        <input
                            placeholder="Địa chỉ cu thể (số nhà, tên đường)"
                            className="border-2 border-black-50 w-full p-2"
                            value={details}

                            onChange={e => setDetails(e.target.value)}
                            type="text" id="address" />
                    </div>

                </div>
            </Modal>

        </div>
    );
}

export default AddressProfile;

