import { useLocation, useNavigate } from "react-router";
import React, { useEffect, useRef, useState } from "react";
import ShoppingHeader from "@/components/shop/header";
import { formatPrice, formatRatingLengt, locationPath, mapCategoryFromUrl } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { addToCartProduct, getProductById } from "@/store/Shop/users/userThunk";
import { addToCart, removeToCart, } from "@/store/Shop/users";

import { FaStar } from "react-icons/fa6";
import { allcategory } from "@/config";
import ProductsCustom from "@/hooks/products";
import { message } from "antd";
import { FaCartPlus } from "react-icons/fa";
import test from "node:test";
import CommentProduct from "@/components/shop/comment";


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
  const { cartIndex, items, payloadProducts, isProducts } = useSelector((state) => state.shoppingProduct);
  const { isAuthenticated, user } = useSelector(state => state.shoppingAuth)
  const [select, setSelect] = useState()
  const [checkCart, setCheckCart] = useState()
  // console.log(isAuthenticated, user);
  


  useEffect(() => {
    if (split) {
      // setIsLoading(!isLoading)
      dispatch(getProductById(split))
    }
  }, [split])

  useEffect(() => {
    if (select !== undefined && payloadProducts !== undefined) {
      const attributes = Object.keys(select).map(attributeName => ({
        name: attributeName,
        value: select[attributeName].value
      }));

      const matchingProduct = payloadProducts?.variants?.find((variant) => {
        return attributes.every((selectedAttr) => {
          return variant.attributes.some((attr) =>
            attr.name === selectedAttr.name && attr.value === selectedAttr.value
          );
        });
      });
      // console.log(attributes);
      // console.log(matchingProduct);

      if (matchingProduct) {
        setCheckCart(matchingProduct)
      }

    }
  }, [select, payloadProducts])


  const handleAddToCart = () => {

    if (!select) {
      message.error("Chua chon phan loai")
     
    } else if (cartIndex === 0) {
      message.error("Vui them so luong")
      return
    } else if (!checkCart && cartIndex==0){
      message.error("Sản phẩm hết hàng hoặc chọn không đúng số lượng");
      return
    } else if (!isAuthenticated && user === null ) {
      message.error("Vui long dang nhap.Chuyen huong trang sau 3s")
      setTimeout(() => {
        nav('/shop/login')
      }, 3000);
      return
    }


    if (checkCart ) {
      const attributes = Object.keys(select).map(attributeName => ({
        name: attributeName,
        value: select[attributeName].value
      }));
    
      const checkattributes = checkCart?.attributes?.map(({ _id, ...item }) => item);

      if (JSON.stringify(attributes) === JSON.stringify(checkattributes)) {
        message.success("Da them vao gio hang")

      } else {
        message.error("het hang")
      }
    
      dispatch(addToCartProduct({
        productId: payloadProducts._id,
        quantity: cartIndex,  
        price: payloadProducts.price,
        salePrice: payloadProducts.salePrice,
        attributes: attributes,
        priceBeta : checkCart.price,
        sku : checkCart.sku
      }));
    } 
  }



  return (
    <div>
      <header>
        < ShoppingHeader></ShoppingHeader>

      </header>
      {isProducts === true ? <div className="py-5 m-5 bg-[#fafafa]">
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
              <h1 className="text-2xl font-bold">{payloadProducts?.name} </h1>
              {/* star */}
              <div className="flex gap-5">
                <div className="flex items-center">
                  <span>{payloadProducts?.imdb?.rating}</span>
                  <span className="flex">{[...Array(5).keys()].map(i => <FaStar key={i} />)}</span>
                  {/* <span><FaStar/></span> */}
                </div>
                <hr className="border-gray-300 border-[1px] h-[20px]" />
                <div>
                  <p><span>{formatRatingLengt(payloadProducts?.imdb?.votes)}</span> đánh giá</p>
                </div>
              </div>
              {/* Gia */}
              <div className="p-2 bg-[#fafafa] flex  items-center gap-10 ">

                <div className="text-2xl text-[#d14f49]">{formatPrice(payloadProducts?.salePrice)}</div>
                <div className="line-through text-gray-500">{formatPrice(payloadProducts?.price)}</div>
                <div className="bg-[#ea4c20] text-white px-2 py-1 rounded-md">- 40 %</div>

              </div>
              {/* chọn loại */}
              <ProductsCustom
                select={select} setSelect={setSelect}
                productType={payloadProducts?.category} variants={payloadProducts?.variants}
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
                <input type="text"
                  value={cartIndex} readOnly className="w-12 px-2 py-1 text-center border-gray-300 border-[1px] rounded-md" />
                <button
                  onClick={() => {
                    dispatch(addToCart())
                  }}
                  className="bg-gray-300 px-2 py-1 rounded-md">+</button>
                <p>{(select && payloadProducts && checkCart !== null && checkCart !== undefined) ? checkCart.quantity : "1000"}sản phẩm có sẵn</p>
              </div>

              <div className="my-10 flex gap-20">
                <button
                  onClick={handleAddToCart}
                  className="bg-red-200 text-[#951d38] border-[#951d38] border-[1px] p-2 flex  items-center gap-2 rounded-sm"
                ><span><FaCartPlus /></span><span>Thêm vào giỏ hàng</span></button>

                <button
                  onClick={() => {
                    if (!isAuthenticated && user === null) {
                      message.error("Vui long dang nhap.Chuyen huong trang sau 3s")
                      setTimeout(() => {
                          nav('/shop/login')
                      }, 3000);
                      return
                  } else {
                    nav('/shop/cart')
                  }}}
                  className="bg-red-700 text-white p-2 flex  items-center gap-2 rounded-sm"
                >Mua ngay</button>
              </div>
            </div>
          </section>


        </div>
        <section className="py-5 m-5 bg-[#fafafa]">
          <div className="bg-white drop-shadow-sm">
            <p>
              Thông tin sản phẩm : <span>{payloadProducts.description}</span>
            </p>
          </div>

        </section>
        <section className="py-5 m-5 bg-[#fafafa]">
          <CommentProduct  nav={nav} user={user} isAuthenticated={isAuthenticated} payloadProductsId={payloadProducts._id} />
        </section>
      </div> : "Loading"}

    </div>
  );
};

export default CardProduct;


