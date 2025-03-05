import { createVoucher } from "@/store/admin";
import { adminVoucherSchema } from "@/validations/Yup/adminYupForm";
import { message } from "antd";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

const VoucherCreate = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            promotionTitle : '',
            discountCode: '',
            endDate: '',
            rolerVoucher: 'all',
            roleCustomer: 'admin',
            promotionDescription: '',
            discountAmount : ''
        },
        onSubmit: (values) => {      
            dispatch(createVoucher(values)).then((data) => {
               
                if (data?.payload?.success === true) {

                    message.success(data?.payload?.message)
                    formik.resetForm()
                }
                if (data?.payload?.success === false) {
                    message.error(data?.payload?.message)
                }
                
            })
        },
        validationSchema: adminVoucherSchema
    })
    return (
        <div className="p-2">
            <h2 className="text-2xl font-bold"> 🎁 Tạo mã Voucher Khuyến mãi</h2>
            <form className="space-y-2" onSubmit={formik.handleSubmit}>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tiêu đề khuyến mãi <span className="text-red-500">*</span>
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
                 
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Nhập code  <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="discountCode"
                            type="text"
                            placeholder="Ví dụ: EC2025..."
                            className={`w-full px-3 py-2 border rounded-md`}
                            value={formik.values.discountCode}
                            onChange={formik.handleChange}
                            />
                            <div className="text-sm text-red-500">
                                {formik.errors.discountCode}
                            </div>
                    
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Nhập giá giảm <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="discountAmount"
                            type="text"
                            placeholder="Ví dụ: 20 , 30  ,1000 , ...."
                            className={`w-full px-3 py-2 border rounded-md`}
                            value={formik.values.discountAmount}
                            onChange={formik.handleChange}
                            />
                            <div className="text-sm text-red-500">
                                {formik.errors.discountAmount}
                            </div>
                    
                    </div>
                </div>


                <button className="px-2 py-1 bg-[#FFA500] text-white rounded-md">Xác nhận</button>
            </form>
        </div>
    );
}

export default VoucherCreate;
