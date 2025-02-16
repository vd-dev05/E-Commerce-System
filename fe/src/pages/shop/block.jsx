import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const BlockUserShop = () => {
    
    const nav = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
          try {
              const isBlock = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1/users/check-block`, {
                  method: 'GET',
                  credentials: 'include',
                  
              }) 
              const data = await isBlock.json()
             
              
              if (data?.success === false && data?.message === "jwt must be provided" ) {
                nav('/shop/login')
              } else  if ( data?.message !== "jwt must be provided" && data?.success === true &&  data?.count > 3 && data?.message === "Get block user successfully" ) {
                nav('/block')
              } else {
                nav('/shop/home')
              }
          } catch (error) {
              console.log(error);
              
          }
        }
        fetchData();
      }, [])
      

    return (
        <div className="px-16 py-10 w-full">
            <div className="flex flex-col gap-6 items-center w-full">
                <h1 className="text-4xl font-bold text-center text-red-600">Block User</h1>
                <img
                    className="w-96 h-auto object-contain rounded-lg"
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/46WQRa5uPUD.png" alt="Block User Image" />
            </div>

            <p className="text-xl font-medium text-center mt-4">Bạn đã bị block, vui lòng liên hệ admin để được hỗ trợ</p>

            <div className="py-5 space-y-3 flex justify-between" >
                <div className="w-1/2">
                    <h2 className="text-2xl font-semibold">Các trường hợp nào dúng dẫn với bị block</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li className="text-lg">Comment thô tục, không đúng tiêu chuẩn cộng đồng</li>
                        <li className="text-lg">Spam Thanh toán</li>
                        <li className="text-lg">Hủy đơn hàng nhiều lần</li>
                        <li className="text-lg">Tìm kiếm từ ngữ không phù hợp</li>
                    </ul>
                </div>
                <div className="w-1/2 flex flex-col gap-3">

                    <input
                    placeholder="Nhập lời trăn trối đi còn được tha tội"
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg"
                    type="text" />
                     <input
                    placeholder="Nhập email"
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg"
                    type="email" />
                        <input
                    placeholder="Nhập số điện thoại"
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg"
                    type="text" />
                    <button className="w-full h-10 px-3 bg-red-600 text-white rounded-lg">Xác nhận</button>
                </div>

            </div>
        </div>
    );
}

export default BlockUserShop;