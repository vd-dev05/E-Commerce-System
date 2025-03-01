import { chatMessage } from "@/components/shop/chat/details"
import { adminVoucherSchema } from "@/validations/Yup/adminYupForm"
import { message } from "antd"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const NotificationAdmin = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            promotionTitle : '',
            discountCode: '',
            endDate: '',
            rolerVoucher: 'all',
            roleCustomer: 'admin',
            promotionDescription: '',
            image : '',
        },
        onSubmit: (values) => {      
            // console.log(values);
            CreateNotification(values)
        },
        validationSchema: adminVoucherSchema
    })
    const [isLoading,setIsLoading] = useState(false)
    useEffect(() => {
        test();
        chatMessage.on('joinRoomAdmin', (data) => {
            console.log(data);
        })

        return () => {
            chatMessage.off('joinRoomAdmin');
        }
    }, [chatMessage])
    
    const test = () => {
       const data = {
        roomId : 'admin',
        password : '123'
       }
        chatMessage.emit('joinRoomAdmin', (data));
    }
    const CreateNotification = (payload) => {
        console.log(payload);
        const data ={
            timeCreate : new Date(),
            payload
        }
        if (payload) {
            chatMessage.emit("adminSendNotification",data )
        } else {
            message.error("chua co data")
        }
    }

    
    return ( 
        <div className="p-2">
        <h2
        onClick={() => CreateNotification("tét")}
        className="text-2xl font-bold flex items-center">
            <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </span>
             Tạo Thông Báo Trực tiếp
        </h2>
        <form className="space-y-2" onSubmit={formik.handleSubmit}>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiêu đề thông báo khuyến mãi <span className="text-red-500">*</span>
                </label>
                <input
                    id="promotionTitle"
                    type="text"
                    placeholder="Ví dụ: Giảm giá 50% cho thành viên mới"
                    className={`w-full px-3 py-2 border rounded-md`}
                    value={formik.values.promotionTitle}
                    onChange={formik.handleChange}
                />
                <div className="text-sm text-red-500">
                    {formik.errors.promotionTitle}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nội dung chi tiết <span className="text-red-500">*</span>
                </label>
                <input
                    id="promotionDescription"
                    type="text"
                    placeholder="Ví dụ: Mô tả chi tiết chương trình khuyến mãi..."
                    className={`w-full px-3 py-2 border rounded-md`}    
                    value={formik.values.promotionDescription}
                    onChange={formik.handleChange}
                />
                <div className="text-sm text-red-500">
                    {formik.errors.promotionDescription}
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hình ảnh thông báo<span className="text-red-500">*</span>
                </label>
                <input
                    id="image"
                    type="file"
                    className={`w-full px-3 py-2 border rounded-md`}
                    onChange={(e) => {
                        formik.setValues({
                            ...formik.values,
                            image: e.target.files[0]
                        })
                    }}
                />
                <div className="text-sm text-red-500">
                    {formik.errors.image}
                </div>

            </div>
            <div className="flex w-full gap-2" >
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Thời gian kết thúc <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="endDate"
                        type="date"
                        className={`w-full px-3 py-2 border rounded-md`}
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                    />
                    <div className="text-sm text-red-500">
                        {formik.errors.endDate}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Đối tượng áp dụng <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="rolerVoucher"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-300"
                        value={formik.values.rolerVoucher}
                        onChange={formik.handleChange}
                        
                    >
                        <option value="all">🎯 Tất cả người dùng</option>
                        <option value="user_month">📅 Người dùng theo tháng</option>
                        <option value="user_year">📆 Người dùng theo năm</option>
                        <option value="user_voucher">🎫 Người dùng có voucher</option>
                    </select>
                    
                </div>
             
               
            </div>


            <button className="px-2 py-1 bg-[#FFA500] text-white rounded-md">Xác nhận</button>
        </form>
    </div>
     );
}
 
export default NotificationAdmin;