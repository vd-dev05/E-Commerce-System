import { assets } from "@/assets/assets";
import { formatPrice, formatTitleLenght } from "@/lib/utils";
import { getToCartProduct } from "@/store/Shop/users";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
const CartShop = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const { isGetToCartProduct,payloadCartProduct, totalCart } = useSelector(state => state.shoppingProduct)
    useEffect(() => {
        if (payloadCartProduct === null ) dispatch(getToCartProduct())

    }, [dispatch])
    // console.log(isGetToCartProduct, payloadCartProduct);
    
    return (
        <div className="w-[400px] h-[400px] bg-white drop-shadow-md rounded-md  absolute top-10 right-0">
            {
                (isGetToCartProduct === false && payloadCartProduct ) ? payloadCartProduct 
                    // ?.sort((a, b) => b?.productId?.imdb - a?.productId?.imdb)
                    .slice(0, 3)
                    .map((item , index) => {
                   
                    
                    return (
                        <div key={index} className="flex gap-2 p-2 justify-between items-center">

                            <div className="flex items-center">
                                <img
                                    className="h-[90px] w-[90px] object-cover "
                                    src={assets.banner_1} alt="anh 1" />
                                <div className="flex flex-col p-5 items-start  ">
                                    <h2>{formatTitleLenght(item?.productId?.name, 13    )}</h2>
                                    <span>Gia : {formatPrice(item?.salePrice)}</span>
                                </div>
                            </div>

                            <div>
                                Số lượng: <span>{item?.quantity}</span>
                            </div>

                        </div>
                    )
                })
            : <div></div>}
            <div className="absolute bottom-2 flex justify-between w-full items-center ">
                <div className="translate-x-10"><span>{totalCart}</span> đã thêm </div>
                <button
                    onClick={() => nav("/shop/cart")}
                    className="bg-red-400 rounded-lg p-2 text-white  "
                >Xem sanr pham</button>
            </div>
        </div>
    );
}

export default CartShop;