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

    useEffect(() => {
        if (payloadCartProduct === null) dispatch(getToCartProduct());
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
                    : <div></div>
            }
            <div className="absolute bottom-2 flex justify-between w-full items-center">
                <div className="translate-x-10"><span>{totalCart}</span>san pham đã thêm</div>
                <button
                    onClick={() => nav("/shop/cart")}
                    className="bg-red-400 rounded-lg p-2 text-white"
                >Xem sản phẩm</button>
            </div>
        </div>
    );
};

export default CartShop;
