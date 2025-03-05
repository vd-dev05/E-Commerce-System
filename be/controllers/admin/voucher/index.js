// import { cacheTime } from "../../../config/index.js";
import { ErrorNotFoundResponse } from "../../../error/errorResponse.js";
import UserModel from "../../../models/auth/userModel.js";
import { Notification } from "../../../models/shop/notificationModel.js";
// import { cache } from "../../../../socket/src/countDown.js";

const Voucher = {
    createVoucher: async (req, res) => {
        try {
            const { promotionTitle, discountCode, endDate, rolerVoucher, roleCustomer, promotionDescription , discountAmount } = req.body;

            
           
            const voucher = await Notification.findOne({ discountCode })
            if (voucher) {
               return res.status(200).json({ message: "discountCode is already used" , success : false })
            } else {
                let arrUser = []
                let totalUser = 0
                if (rolerVoucher === 'all') {
                    // arrUser = ['user_month', 'user_year']
                    const userAll = await UserModel.find({});
                    totalUser = userAll.length;
                    userAll.forEach(user => {
                        arrUser.push(user._id);
                    });
                } else if (rolerVoucher === 'user_month') {
                    const now = new Date();
                    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                    const userAll = await UserModel.find({ updatedAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } });
                    userAll.forEach(user => {
                        arrUser.push(user._id);
                    });
                    totalUser = userAll.length;
                } else if (rolerVoucher === 'user_year') {
                    const year = new Date().getFullYear();

                    const userAll = await UserModel.find({ updatedAt: { $gte: new Date(`${year - 2}-01-01`), $lte: new Date(`${year - 1}-12-31`) } });

                    userAll.forEach(user => {
                        arrUser.push(user._id);
                    });
                    totalUser = userAll.length;
                } else if (rolerVoucher === 'user_voucher') {
                    const userAll = await UserModel.find({})
                    userAll.forEach(user => {
                        arrUser.push(user._id)
                    })
                    totalUser = userAll.length;
                }
                const data = {
                    promotionTitle,
                    discountCode,
                    endDate,
                    rolerVoucher,
                    roleCustomer,
                    promotionDescription,
                    readStatus: arrUser !== undefined ? arrUser.map(user => ({ userID: user, read: true })) : [],
                    readAt: new Date(),
                    totalUser,
                    discountAmount
                }
                const pushVoucher = await Notification.create(data)
                if ( pushVoucher) {
                    res.status(200).json({
                        message : "Thêm thành công voucher",
                        success : true
                    })
                }
              
            }
        } catch (error) {
            ErrorNotFoundResponse(res, error);
        }
    },
    getVoucherUserPromotion : async (req,res) => {
        try {
            const voucher = await Notification.find({})
            .select('-roleCustomer ')

            res.status(200).json({
                voucher,
                total : voucher.length,
                success : true,
                message : "Get All Voucher Successfull"
            })
        } catch (error) {
            ErrorNotFoundResponse(res, error);
        }
    },
    updatetime : async (req,res) => {
        try {
            // const {sale} = req.body 
            // cacheTime.time =Number( sale)

            // cache.timeLeft = cacheTime.time;
            // cache.timeStart = 1;
            
            // res.status(200).json({success : true , cacheTime})
        } catch (error) {
            ErrorNotFoundResponse(res, error);
        }
    }
}

export default Voucher