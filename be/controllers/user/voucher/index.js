import Voucher from "../../../models/admin/voucherModels.js";

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
    }
}
export default VoucherController