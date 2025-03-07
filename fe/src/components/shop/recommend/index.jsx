import { formatPrice, formatTitleLenght } from "@/lib/utils";
import { clickRecommend } from "@/store/Shop/users";
import { recommendProduct } from "@/store/Shop/users/userThunk";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

const Recommend = () => {
    const recommendHistory = localStorage.getItem('recommend') || [];
    const dispatch = useDispatch()
    const { isLoadingRecommend, payloadRecommend } = useSelector(state => state.shoppingProduct)
    const { user, isAuthenticated } = useSelector(state => state.shoppingAuth)
    useEffect(() => {
        if (recommendHistory.length === 0) {
            return
        } else {
            if (recommendHistory !== null || user !== null || recommendHistory.length > 0) {
                dispatch(recommendProduct({ obj: recommendHistory }))
            } else {
                return
            }
        }

    }, [recommendHistory, clickRecommend])

 
    

    return (
        <div>
            <h2 className="text-xl font-normal">Gợi ý cho bạn</h2>
            <div className="grid grid-cols-6 mt-4">
                {user && isAuthenticated ? (
                    !isLoadingRecommend && payloadRecommend?.length > 0 ? (
                        payloadRecommend.map((item) => (
                            <Link
                            to={`/shop/listing/${item.category}/${item._id}`}
                            key={item._id} className="cursor-pointer w-[200px]">
                                <div className="relative w-full drop-shadow-lg py-2">
                                    <img
                                        className="w-full h-[200px] object-cover rounded-md"
                                        src={item?.images?.mainImage} alt="" />
                                    <div className="absolute bottom-0 w-full p-2 bg-white">
                                        <div className="flex flex-col items-start">
                                            <div className="flex items-center justify-center text-black">{formatTitleLenght( item?.name,18)}</div>
                                            <div className="flex items-center justify-center">
                                                <span>{item.price ? formatPrice(item?.price) : "1.000 đ"}</span>
                                                <sup>- 30%</sup>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-nowrap">Chưa có sản phẩm gợi ý nào hãy tìm sản phẩm đi </div>
                    )
                ) : (
                    <div className="text-nowrap">Bạn phải đăng nhập để sử dụng tính năng này</div>
                )}
            </div>
        </div>
    );
}

export default Recommend;