import { useLocation, useNavigate } from "react-router";
import React, { useEffect, useRef, useState } from "react";
import ShoppingHeader from "@/components/shop/header";
import { locationPath, mapCategoryFromUrl } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getProductById, removeToCart } from "@/store/Shop/users";
import { FaStar } from "react-icons/fa6";
import { allcategory } from "@/config";
import ProductsCustom from "@/hooks/products";
import { message } from "antd";
import { FaCartPlus } from "react-icons/fa";
const productImages = [
  "https://images.pexels.com/photos/158827/field-corn-air-frisch-158827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/210178/pexels-photo-210178.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];
const CardProduct = () => {
  const split = locationPath().split("/")[4];
  const queryProductType = locationPath().split("/")[3]
  const dispatch = useDispatch()
  const nav = useNavigate()
  const [mainImage, setMainImage] = useState(productImages[0]);
  const { cartIndex, items } = useSelector((state) => state.shoppingProduct);
  
  useEffect(() => {
    if (split) {
      // setIsLoading(!isLoading)
      dispatch(getProductById(split))
    }
  }, [split])
  // const   
  //  const mapalpha = mapCategoryFromUrl(decodeURI(queryProductType))
  //  const dataCategoryLink = allcategory[mapalpha]
  // console.log(dataCategoryLink);
  const dataPhoneFake = {
    productType: "Điện Thoại",
    attributes: {
      color: ["Red", "Black"]
    },
    price: 1000,
    salePrice: 500
  }

  const dataFashionFake = {
    productType: "Thời Trang Nam",
    attributes: {
      size: ["S", "M", "L"],
      color: ["Đỏ Đen", "Đen Xám"]
    },
    price: 1000,
    salePrice: 500
  }

  return (
    <div>
      <header>
        < ShoppingHeader></ShoppingHeader>

      </header>
      <div className="py-5 m-5 bg-[#fafafa]">
        <div className="flex bg-white drop-shadow-sm" >
          <section className="w-1/2">
            <div className="flex space-x-4 ">
              {/* danh sách ảnh nhỏ */}
              <div className="flex flex-col space-y-2">
                {productImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-24 object-cover cursor-pointer border-2 border-transparent hover:border-blue-500 rounded-lg"
                    onMouseEnter={() => setMainImage(image)}
                  />
                ))}
              </div>

              {/* ảnh lớn hiển thị */}
              <div className="flex-1">
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-[350px] h-[400px] object-cover rounded-lg"
                />
              </div>
            </div>
          </section>
          <section className="w-2/3">
            <div >
              <h1 className="text-2xl font-bold">Product Name . Lorem ipsum dolor sit amet consectetur adipisicing elit. </h1>
              {/* star */}
              <div className="flex gap-5">
                <div className="flex items-center">
                  <span>2.2k </span>
                  <span className="flex">{[...Array(5).keys()].map(i => <FaStar key={i} />)}</span>
                  {/* <span><FaStar/></span> */}
                </div>
                <hr className="border-gray-300 border-[1px] h-[20px]" />
                <div>
                  <span>5k4 đánh giá</span>
                </div>
              </div>
              {/* Gia */}
              <div className="p-2 bg-[#fafafa] flex  items-center gap-10 ">

                <div className="text-2xl text-[#d14f49]">₫ 1000k</div>
                <div className="line-through text-gray-500">₫ 2000k</div>
                <div className="bg-[#ea4c20] text-white px-2 py-1 rounded-md">- 40 %</div>

              </div>
              {/* chọn loại */}
              <ProductsCustom productType={dataFashionFake.productType} attributes={dataFashionFake.attributes}
                className="p-2" />
              {/* Chon so luong  */}
              <div className="p-2 flex gap-2 items-center">
                <p>Số lượng</p>
                <button
                  onClick={() => {
                    if (cartIndex === 0) message.error("Vui lòng chọn thêm số lượng ")
                    dispatch(removeToCart())
                  }}
                  className="bg-gray-300 px-2 py-1 rounded-md">-</button>
                <input type="text" value={cartIndex} className="w-12 px-2 py-1 text-center border-gray-300 border-[1px] rounded-md" />
                <button
                  onClick={() => {
                    dispatch(addToCart())
                  }}
                  className="bg-gray-300 px-2 py-1 rounded-md">+</button>
                  <p>100000 sản phẩm có sẵn</p>
              </div>

              <div className="my-10 flex gap-20">
                <button
                className="bg-red-200 text-[#951d38] border-[#951d38] border-[1px] p-2 flex  items-center gap-2 rounded-sm"
                ><span><FaCartPlus /></span><span>Thêm vào giỏ hàng</span></button>

                <button
                onClick={() => {
                 nav('/shop/cart')
                }}
                className="bg-red-700 text-white p-2 flex  items-center gap-2 rounded-sm"
                >Mua ngay</button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default CardProduct;
