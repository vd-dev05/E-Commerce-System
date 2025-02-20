import { assets } from "@/assets/assets";
import { formatPrice, formatTitleLenght } from "@/lib/utils";
import { getToCartProduct } from "@/store/Shop/users/userThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CartShop = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { isGetToCartProduct, payloadCartProduct, totalCart } = useSelector(state => state.shoppingProduct);
    const { isAuthenticated, user } = useSelector(state => state.shoppingAuth)
    useEffect(() => {
        if (payloadCartProduct === null && isAuthenticated === true && user !== null) {
            // console.log("lan 3");
            
            // dispatch(getToCartProduct());
        } 
    }, [dispatch]);


    const uniqueProducts = payloadCartProduct?.reduce((acc, item) => {
        const existingItem = acc.find(product => product.productId._id === item.productId._id);
        if (!existingItem) {
            acc.push(item);
        }
        return acc;
    }, []);


    return (

        <div className="w-[400px] h-[400px] bg-white drop-shadow-md rounded-md absolute top-10 right-0">
            {isAuthenticated === true && user !== null ?
                <div>
                    {
                        (isGetToCartProduct === false && uniqueProducts) ? uniqueProducts
                            .slice(0, 3)
                            .map((item, index) => (
                                <div key={index} className="flex gap-2 p-2 justify-between items-center">
                                    <div className="flex items-center ">
                                        <img
                                            className="h-[90px] w-[90px] object-cover"
                                            src={assets.banner_1} alt="anh 1" />
                                        <div className="flex p-2 gap-10 items-center justify-between">
                                            <h2 className="text-nowrap">{formatTitleLenght(item?.productId?.name, 13)}</h2>
                                            <span className="text-red-400 text-nowrap">{formatPrice(item?.salePrice)}</span>
                                        </div>
                                    </div>

                                </div>
                            ))
                            : <div
                                className="flex flex-col justify-center items-center h-full"
                            >Chưa có sản phẩm nào.Hay thêm vào giỏ hàng</div>
                    }
                    {uniqueProducts ? <div className="absolute bottom-2 flex justify-between w-full items-center">

                        <div className="translate-x-10"><span>{totalCart}</span>san pham đã thêm</div>
                        <button
                            onClick={() => nav("/shop/cart")}
                            className="bg-red-400 rounded-lg p-2 text-white"
                        >Xem sản phẩm</button>
                    </div> : ''}

                </div>
                : 
                <div className=" absolute right-10 flex items-center flex-col justify-between h-full">
                    <div className="flex flex-col items-center">
                        <img
                            className="w-40 h-40 object-contain"
                            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/fc9c8de0048cfefe.png" alt="" />
                        <p>Ban phai dang nhap su dung tinh nang nay</p>

                    </div>

                    <div className="p-2 flex gap-2">
                        <button
                            onClick={() => nav("/shop/login")}
                            className="bg-red-400 rounded-lg p-2 text-white"
                        >Dang nhap</button>
                        <button
                            onClick={() => nav("/shop/register")}
                            className="bg-red-400 rounded-lg p-2 text-white"
                        >Dang ky</button>
                    </div>
                </div>
                }

        </div>
    );
};

export default CartShop;
