import { formatDateCountDown } from "@/lib/utils";
import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const CommentProduct = ({ payloadProductsId }) => {
    const [value, setValue] = useState('');
    const [data, setData] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const sanitizeInput = (input) => {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(input));
        return div.innerHTML;
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSend = async () => {
        try {
            setIsLoading(true)
            if (value.trim() === '') {
                message.error("Vui lòng nhập nội dung");
                return;
            }
            const sanitizedValue = sanitizeInput(value);
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/products/${payloadProductsId}/comment/create`,
                {
                    content: sanitizedValue,
                },
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                message.success(response?.data?.message || "Them binh luan thanh cong");
                setValue("");
                setIsLoading(false)
            } else {
                message.error(response?.data?.message);
                setIsLoading(false)
            }
        } catch (error) {
            message.error(error?.response?.data?.message);
            setIsLoading(false)
        }
    };

    useEffect(() => {
        const fetechData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/products/comment/${payloadProductsId}`, {
                    withCredentials: true
                })

                if (response.status === 200) {
                    setData(response?.data?.comment)
                }

            } catch (error) {
                console.log(error);

            }
        }
        fetechData()
    }, [isLoading])


    return (
        <div className="flex flex-col gap-5">
            <h2>Đánh Giá</h2>
            <div className="flex gap-5">
                <input
                    value={value}
                    onChange={handleChange}
                    className="p-2 border-2 border-black"
                    placeholder="Nhập đánh giá sản phẩm"
                    type="text"
                />
                <button
                    className="p-2 border-2 border-black"
                    onClick={handleSend}
                >
                    Xác nhận
                </button>
            </div>

            <div className="bg-[#f5f5f5]">
                <h3>Các đánh giá khác</h3>
                {data?.length > 0 ? data?.map((item) => (
                    <div
                        className="p-2 my-2 drop-shadow-lg bg-white "
                        key={item._id}>
                        <div className="flex gap-2 py-2">
                            <img src={item?.userId?.avartar}
                                className="w-[50px] h-[50px] object-cover rounded-full"
                                alt="" />
                            <div className="flex flex-col gap-[1px]"> 
                                <p className="text-[14px]">{item?.userId?.username}</p>
                                <span className="text-[12px]">{item.update_at ? formatDateCountDown(item?.update_at) : ''}</span>
                            </div>


                        </div>

                        <p>Nội dung :{item?.message}</p>

                    </div>
                )): 
                <div
                className="p-2 my-2 drop-shadow-lg bg-white "
                >Chưa có đánh giá nào !</div>}
            </div>
        </div>
    );
};

export default CommentProduct;
