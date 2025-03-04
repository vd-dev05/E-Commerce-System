import { useLocation, useNavigate } from "react-router";
import React, { useEffect, useRef, useState } from "react";
import ShoppingHeader from "@/components/shop/header";
import { calculateAccountAge, checkOnlineStatus, formatPrice, formatRatingLengt, locationPath, mapCategoryFromUrl } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { addProductFavorite, addToCartProduct, getProductById, removeProductFavorite } from "@/store/Shop/users/userThunk";
import { addToCart, removeToCart, setProduct, } from "@/store/Shop/users";

import { FaCopy, FaHeart, FaHeartCrack, FaRegHeart, FaStar } from "react-icons/fa6";
import { allcategory } from "@/config";
import ProductsCustom from "@/hooks/products";
import { message } from "antd";
import { FaCartPlus, FaHeartBroken } from "react-icons/fa";
import test from "node:test";
import CommentProduct from "@/components/shop/comment";
import axios from "axios";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IoIosChatboxes } from "react-icons/io";


// const productImages = [
//   "https://images.pexels.com/photos/158827/field-corn-air-frisch-158827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   "https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//   "https://images.pexels.com/photos/210178/pexels-photo-210178.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
// ];
const CardProduct = () => {
  const split = locationPath().split("/")[4];
  const queryProductType = locationPath().split("/")[3]
  const dispatch = useDispatch()
  const nav = useNavigate()
  
  const { cartIndex, items, payloadProducts, isProducts, isAddToLove, isUnlikeLove } = useSelector((state) => state.shoppingProduct);
  const { isAuthenticated, user } = useSelector(state => state.shoppingAuth)
  const [select, setSelect] = useState()
  const [checkCart, setCheckCart] = useState()
  const [isLove, setIsLove] = useState(null)
  let productImages = []
  if (payloadProducts?.images) {
    productImages.push(payloadProducts.images.mainImage)
    payloadProducts.images.additionalImages.forEach((item) => {
      productImages.push(item)
    })

   
  }
  useEffect(() => {
    reloadImage(productImages)
  }, [productImages])
  
  const reloadImage = (productImages) => {
    productImages.forEach((item) => {
      const img = new Image();
      img.src = item
    })
  }
  const [mainImage, setMainImage] = useState(productImages[0]);

  useEffect(() => {
    if (payloadProducts === null && isProducts === false) {
      dispatch(getProductById(split))
    }
    const fetech = async () => {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/favorite/${split}/check`, {}, {
        withCredentials: true
      })
      if (response.statusText === "OK") {
        setIsLove(response.data.isFavorite)
      }
    }
    fetech()
  }, [split])


  useEffect(() => {
    if (select !== undefined && payloadProducts !== undefined && isProducts === true) {
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
    } else if (!checkCart && cartIndex == 0) {
      message.error("Sản phẩm hết hàng hoặc chọn không đúng số lượng");
      return
    } else if (!isAuthenticated && user === null) {
      message.error("Vui long dang nhap.Chuyen huong trang sau 3s")
      setTimeout(() => {
        nav('/shop/login')
      }, 3000);
      return
    }


    if (checkCart) {
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
        priceBeta: checkCart.price,
        sku: checkCart.sku
      }));
    }
  }
  const handleCreateChat = async () => {

    const receiverId = `userId-${user.id}-managerId-${payloadProducts.managerId._id}-${new Date().getTime()}`
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/room/create/${payloadProducts.managerId._id}`, {
      receiverId,
    }, {
      withCredentials: true,
    })
    // console.log(response);
    

  }

  console.log(payloadProducts);
  
  return (
    <div>
      <header>
        < ShoppingHeader></ShoppingHeader>

      </header>
      {(isProducts === true && payloadProducts !== null) ? <div className="py-5 m-5 bg-[#fafafa]">
        <div className="flex bg-white drop-shadow-sm" >
          {/* image  */}
          <section className="w-1/2">
            <div className="flex space-x-4 ">
              {/* danh sách ảnh nhỏ */}
              <div className="flex flex-col space-y-2">
                {productImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                   loading="lazy"
                    alt={`Thumbnail ${index + 1}`}
                    className="w-40 h-32 object-cover cursor-pointer border-2 border-transparent hover:border-blue-500 rounded-lg"
                    onMouseEnter={() => {
                      setMainImage(image)
                      console.log(image);
                      
                    } }
                  />
                ))}
              </div>

              {/* ảnh lớn hiển thị */}
              <div>
                <div className="flex-1">
                  <img
                    src={mainImage}
                    alt="Main Product"
                    className="w-[350px] h-[400px] object-cover rounded-lg"
                  />

                </div>
                <div className="flex items-center space-x-2 gap-2 p-2">
                  <button className="p-2 border-2 border-gray-300 rounded-md hover:bg-gray-200 flex gap-2 items-center" onClick={() => {
                    message.success("Sao chép thành công")
                    navigator.clipboard.writeText(window.location.href)
                  }
                  }>

                    <span>
                      <FaCopy className="w-5 h-5" />
                    </span>
                    <p className="text-xs" >Chia sẻ </p>
                  </button>
                  {isLove === false
                    ?
                    <button
                      onClick={() => {
                        dispatch(addProductFavorite(payloadProducts._id))
                        if (isAddToLove === false) {
                          message.success("Thêm sản phẩm thành công")
                        }

                      }}
                      className="p-2 border-2 border-gray-300 rounded-md hover:bg-gray-200 flex gap-2 items-center">

                      <span><FaRegHeart className="w-5 h-5" /></span>
                      <p className="text-xs">Nhấn thích sản phẩm</p>
                    </button>
                    :
                    <button
                      onClick={() => {
                        dispatch(removeProductFavorite(payloadProducts._id))
                        if (isUnlikeLove === false) {
                          message.success("Xóa sản phẩm yêu thích thành công")
                        }
                      }}
                      className="p-2 border-2 border-gray-300 rounded-md hover:bg-gray-200 flex gap-2 items-center">

                      <span> <FaHeart className="w-5 h-5" /></span>
                      <p className="text-xs">Bỏ thích sản phẩm</p>
                    </button>
                  }

                </div>
              </div>


            </div>
          </section>
          {/* select option so luong san pham */}
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
                    }
                  }}
                  className="bg-red-700 text-white p-2 flex  items-center gap-2 rounded-sm"
                >Mua ngay</button>
              </div>
            </div>
          </section>
        </div>
        {/* thong tin nha ban */}
        <section>
          <div className="py-5 m-5 bg-[#fafafa]">
            <div className="flex justify-between">
              <div className="flex gap-10">
                <Avatar className="h-[100px] w-[100px] cursor-pointer">
                  <AvatarImage

                    src="https://down-vn.img.susercontent.com/file/c652e52ce1c2187aaa4e67fa060a3f16@resize_w80_nl.webp" />
                </Avatar>

                <div className="flex flex-col gap-3">
                  <h4>{payloadProducts?.managerId?.manager_name}</h4>
                  <p>{checkOnlineStatus(payloadProducts?.managerId?.last_login)}</p>
                  <button
                    onClick={() => handleCreateChat()}
                    className="flex w-[140px] gap-2 border-[2px] border-red-500 text-red-700 p-2 items-center bg-[#ffd5c8] "
                  ><span><IoIosChatboxes /></span>Chat ngay</button>
                </div>
              </div>

              <div className="flex flex-col gap-10">
                <div className="flex gap-5">
                  <p>Thời gian </p>
                  <p>{calculateAccountAge(payloadProducts?.managerId?.createdAt)}</p>
                </div>
                <div className="flex gap-5">
                  <p>Đánh giá </p>
                  <span className="text-[#d14f49]">54 k</span>
                </div>
              </div>
            </div>


          </div>
        </section>
        {/* thong tin san pham */}
        <section className="py-5 m-5 bg-[#fafafa]">
          <div className="bg-white drop-shadow-sm">
            <p>
              Thông tin sản phẩm : <span>{payloadProducts.description}</span>
            </p>
          </div>

        </section>
        {/* comment san pham */}
        <section className="py-5 m-5 bg-[#fafafa]">
          <CommentProduct nav={nav} user={user} isAuthenticated={isAuthenticated} payloadProductsId={payloadProducts._id} />
        </section>
      </div> :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="w-full h-96 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-full h-96 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-full h-96 bg-gray-300 rounded animate-pulse"></div>
        </div>
      }

    </div>
  );
};

export default CardProduct;


