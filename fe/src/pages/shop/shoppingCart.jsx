import { Checkbox } from "@/components/ui/checkbox";
import { formatPrice, formatTitleLenght } from "@/lib/utils";
import {  createOrder, getCoinPaypal, getToCartProduct, removeAllCart, removeToCartProduct } from "@/store/Shop/users/userThunk";
import { addToCart, removeToCart } from "@/store/Shop/users";
import { message, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import queryString from "query-string";

const generateUniqueId = (item) => {
    const color = item?.variants[0]?.attributes?.find(attr => attr.name === "Màu sắc")?.value;
    const size = item?.variants[0]?.attributes?.find(attr => attr.name === "Kích thước")?.value;
    const beta = item?.variants[0]?.attributes?.find(attr => attr.name === "Chất liệu")?.value;
    return `${item?.productId?._id}-${item?.quantity}-${item?.price}-${color}-${size}-${beta}`;
};


const ShoppingCart = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const { coinUpdate, payloadCartProduct, totalCart, payloadOrder, isOrder, messageOrder, isLoading } = useSelector(
        (state) => state.shoppingProduct
    );
    const [IsPrice, setIsPrice] = useState(false);
    const [selectProduct, setSelectProduct] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [dataProduct, setDataProduct] = useState()
    const [paymentEcom, setpaymentEcom] = useState(false)
   
    const handleSelect = (e) => {
        setIsPrice(e.target.value === "usd");
    };
    // useEffect(() => {
    //     if (isOrder === true && messageOrder === "Order tồn tại" && !isNav) {
    //         nav(`/shop/checkout/${payloadOrder._id}`)
    //     }
    //     console.log(isOrder, messageOrder , isNav);

    // }, [isNav])


    useEffect(() => {
        dispatch(getCoinPaypal());
    }, []);

    useEffect(() => {
        if (payloadCartProduct === null) dispatch(getToCartProduct());
    }, [dispatch, payloadCartProduct]);

    const handleDeleteCart = (item) => {
        dispatch(removeToCartProduct(item));
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectProduct([]); // Deselect all
        } else {
            setSelectProduct(payloadCartProduct?.map((item) => generateUniqueId(item))); // Select all
        }
        setSelectAll(!selectAll);
    };

    const toggleSelectItem = (item) => {
        const uniqueId = generateUniqueId(item);

        if (selectProduct.includes(uniqueId)) {
            setSelectProduct(selectProduct.filter((id) => id !== uniqueId));
            setDataProduct(dataProduct ? dataProduct.filter((dataItem) => generateUniqueId(dataItem) !== uniqueId) : []);
        } else {
            setSelectProduct([...selectProduct, uniqueId]);
            setDataProduct(dataProduct ? [...dataProduct, item] : [item]);
        }
    };

    // console.log(selectProduct);
    const { totalAmount, totalItems } = payloadCartProduct?.reduce(
        (acc, item) => {
            const uniqueId = generateUniqueId(item);
            if (selectProduct.includes(uniqueId)) {
                acc.totalAmount += item?.variants[0]?.quantity * item.salePrice;
                acc.totalItems += item?.variants[0]?.quantity;
            }
            return acc;
        },
        { totalAmount: 0, totalItems: 0 }
    ) ?? { totalAmount: 0, totalItems: 0 };

    const totalAmountUpdate = paymentEcom ? Math.max(0, coinUpdate - totalAmount) : totalAmount;
    return (
        <div>
            <header>
                <div className="p-10 flex items-center gap-5 drop-shadow-lg border-b-2">
                    <Link to={"/shop/home"}>
                        <h1 className="text-3xl font-bold">E-Commerce</h1>
                    </Link>
                    <hr className="h-[40px] border-[1px] border-red-500" />
                    <p className="text-lg border-red-500">Giỏ Hàng</p>
                </div>


            </header>
            <main className="px-10 py-2 bg-slate-50">
                <div onClick={() => console.log(selectProduct, dataProduct, totalAmount, totalItems)
                }>
                    test
                </div>
                <section>
                    <div className="flex justify-between bg-white p-5 shadow-sm my-2 rounded-md">
                        <div className="flex items-center gap-4">
                            <Checkbox
                                onClick={() => toggleSelectAll()}
                                checked={selectAll}
                            />
                            <p className="font-semibold">Sản phẩm</p>
                        </div>
                        <div className="flex gap-16 px-8">
                            <p className="font-semibold">Đơn Giá</p>
                            <p className="font-semibold">Số Lượng</p>
                            <p className="font-semibold">Số Tiền</p>
                            <p className="font-semibold">Thao tác</p>
                        </div>
                    </div>
                </section>
                {payloadCartProduct?.map((item, index) => (
                    <section key={index}>

                        <div className="bg-white p-5 shadow-sm my-2 rounded-md">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex gap-4">
                                    <Checkbox

                                        checked={selectProduct.includes(generateUniqueId(item))}
                                        onClick={() => toggleSelectItem(item)}
                                    />
                                    <img
                                        className="h-14 w-14 object-cover rounded"
                                        src="https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg"
                                        alt=""
                                    />
                                    <Tooltip title={item?.productId?.name}>
                                        <h2 className="truncate">{formatTitleLenght(item?.productId?.name, 20)}</h2>
                                    </Tooltip>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">Phân Loại Hàng:</span>
                                        <div className="flex flex-col">
                                            {item?.variants[0]?.attributes.map((attribute, idx) => (
                                                <span className="text-xs" key={idx}>
                                                    {attribute?.name}: {attribute?.value}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex gap-16 items-center px-8">
                                        <div className="space-x-4">
                                            <span className="line-through text-gray-500">
                                                {formatPrice(item?.price)}
                                            </span>
                                            <span className="text-red-500 font-semibold">
                                                {formatPrice(item?.salePrice)}
                                            </span>
                                        </div>

                                        <div className="flex items-center">
                                            <button
                                                onClick={() => {
                                                    if (item?.quantity === 0)
                                                        message.error("Vui lòng chọn thêm số lượng");
                                                    dispatch(removeToCart(item?.productId));
                                                }}
                                                className="bg-gray-300 px-3 py-1 rounded-md"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                value={item?.variants[0]?.quantity}
                                                className="w-12 mx-2 px-2 py-1 text-center border border-gray-300 rounded-md"
                                                readOnly
                                            />
                                            <button
                                                onClick={() => {
                                                    dispatch(addToCart(item?.productId));
                                                }}
                                                className="bg-gray-300 px-3 py-1 rounded-md"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div>
                                            <span className="text-red-500 font-semibold">
                                                {formatPrice(item?.variants[0]?.quantity * item.salePrice)}
                                            </span>
                                        </div>
                                        <div>
                                            <Dialog>
                                                <DialogTrigger className="bg-red-500 px-3 py-1 rounded-md text-white">
                                                    Xóa
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Ban chac chan xoa gio hang chu
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Tại sao bạn lại xóa ?
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <DialogTrigger className="bg-red-500 px-3 py-1 rounded-md text-white">
                                                            Hủy
                                                        </DialogTrigger>
                                                        <DialogTrigger
                                                            onClick={() => handleDeleteCart(item)}
                                                            className="bg-red-500 px-3 py-1 rounded-md text-white"
                                                        >
                                                            Xóa
                                                        </DialogTrigger>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}

                <section>
                    <div className="flex  p-5 bg-slate-50 w-full ">
                        <div className="w-full">
                            <hr />
                            <div className="flex justify-end p-5 gap-10">
                                <div className="flex gap-2 items-center ">
                                    <p>e-com tài khoản </p>
                                    <Checkbox
                                        checked={paymentEcom}
                                        onClick={() => setpaymentEcom(!paymentEcom)} />
                                </div>
                                <div>
                                    <p> Thanh toán qua tài khoản e-com </p>
                                    <div>
                                        Số dư :{" "}
                                        <span>
                                            {" "}
                                            <span>{IsPrice ? coinUpdate : formatPrice(coinUpdate * 25000)}</span>
                                            <select name="" id="" onChange={handleSelect}>
                                                <option value="vnd">VND</option>
                                                <option value="usd">USD</option>
                                            </select>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="w-full flex items-center justify-between">
                                <div className="flex">
                                    <div className="flex p-5 items-center gap-5">
                                        <Checkbox
                                            onClick={() => toggleSelectAll()}
                                            checked={selectAll}
                                        />
                                        <span>
                                            Chọn tất cả <span>({totalCart})</span>
                                        </span>
                                    </div>

                                    {selectAll ? (
                                        <button
                                            onClick={() => dispatch(removeAllCart())}

                                        >
                                            Xóa tất cả
                                        </button>
                                    ) : (
                                        <button onClick={() => dispatch(removeAllCart())}>Xóa</button>
                                    )}
                                </div>

                                <div className=" items-end justify-end">
                                    <div className="flex gap-5">
                                        <p>
                                            Tổng thanh toán sản phẩm<span>({totalItems}) sản phẩm </span>
                                        </p>
                                        <span>{formatPrice(paymentEcom === true ? totalAmountUpdate : totalAmount)}</span>
                                    </div>

                                    <button
                                        onClick={() => {

                                            if (!dataProduct || dataProduct.length === 0) {
                                                message.error("Vui long chon san pham de thanh toan");
                                            }

                                            if (dataProduct.length > 0 && dataProduct) {

                                                dispatch(createOrder({
                                                    paymentStatus: paymentEcom === true ? 'paid' : 'unpaid',
                                                    dataProduct,
                                                    totalAmount: totalAmountUpdate,
                                                    paymentEcom,
                                                    paymentMeThod: paymentEcom === true ? 'bank_ecom' : 'default',
                                                    paymentSuccess: false
                                                }))

                                                if (isLoading === false) {
                                                    // const encodeIdarr = payloadOrder.map((item) => (item._id ? [item._id] : [])).flat() 
                                                    // console.log(encodeIdarr);
                                                    
                                                    if (isOrder === true && messageOrder === "Order tồn tại") {
                                                        nav(`/shop/checkout/${payloadOrder._id}?isSatus=false&payment=${payloadOrder.paymentMeThod}`)
                                                    }
                                                    if (isOrder === true && messageOrder === "Order created successfully") {
                                                        nav(`/shop/checkout/${payloadOrder._id}?isSatus=true&payment=${payloadOrder.paymentMeThod}`)
                                                    }
                                                }


                                            }


                                        }}
                                        className="bg-red-500 p-2  rounded-sm text-white"
                                    >
                                        Mua Hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ShoppingCart;

