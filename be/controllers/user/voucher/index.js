import Voucher from "../../../models/admin/voucherModels.js";
import { Notification } from "../../../models/shop/notificationModel.js";

const VoucherController = {
    getVoucher : (req,res) => {
        try {
            const {type} = req.query;
            const voucher = Voucher.find({type : type , userId : "67a22b96dd3ecc44d4c67860"});
            if (voucher) {
                res.status(200).json({ voucher, message: "Voucher found successfully" });
            }

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getVoucherPromotion : async (req,res) => {
        try {
            const voucher = await Notification.find({ "readStatus.userID" : req.user.id , "readStatus.read" : true })
            .select('-roleCustomer -rolerVoucher -totalUser -readStatus')
            
            if (voucher) {
                res.status(200).json({
                    message : "Voucher promotion Get SuccessFull",
                    voucher,
                    success : true
                })
            } else {
                res.status(404).json({
                    message : "Voucher Not found",
                    success : false
                })
            }
      
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
export default VoucherController