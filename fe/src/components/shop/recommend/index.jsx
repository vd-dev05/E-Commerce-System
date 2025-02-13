import { formatPrice } from "@/lib/utils";
import { clickRecommend } from "@/store/Shop/users";
import { recommendProduct } from "@/store/Shop/users/userThunk";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Recommend = () => {
    const [data, setData] = useState([])
    const recommendHistory = localStorage.getItem('recommend') || [];
    const dispatch = useDispatch()
    // console.log(recommendHistory);
    const { isLoadingRecommend, payloadRecommend } = useSelector(state => state.shoppingProduct)
    useEffect(() => {
        if (recommendHistory) {
            // const pare = JSON.parse(recommendHistory);
            // console.log(pare);
            dispatch(recommendProduct({ obj: recommendHistory }))
        }
    }, [recommendHistory, clickRecommend])

    // console.log(isLoadingRecommend, payloadRecommend);


    return (
        <div>
            <h2 className="text-xl font-normal">Gợi ý cho bạn</h2>
            <div className="grid grid-cols-6 mt-4">
                {isLoadingRecommend === false && payloadRecommend?.map((item, index) => (
                    <div key={item._id} className="cursor-pointer w-[200px]">
                        <div className="relative w-full drop-shadow-lg py-2">
                            <img
                                className="w-full h-[200px] object-cover rounded-md"
                                src={item?.images?.mainImage} alt="" />
                            <div className="absolute bottom-0 w-full p-2 bg-white">
                                <div className="flex flex-col items-start">
                                    <div className="flex items-center justify-center text-black">{item?.name}</div>
                                    <div className="flex items-center justify-center">
                                        <span>{item.price ? formatPrice(item?.price) : 0}</span>
                                        <sup>- 30%</sup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recommend;