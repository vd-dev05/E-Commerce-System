import mongoose, { Schema } from "mongoose";
import Voucher from "../../../models/admin/voucherModels.js";

export const createVoucher = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId();
        const userId = new mongoose.Types.ObjectId();
        // console.log(id);
        
        const dataFake = {
            _id : id  ,
            userId : userId,
            title:  "Giam 10 %",
            des : "Giam theo date ",
            expiryDate : Date.now(),
            discountType : "percentage",
            discountAmount : 10,
            isClaimed : false,
            type : "all" ,
            discountAmount : 10,
            isClaimed : false,
            code : "ECOM1234"
        }

        const newVoucher = await Voucher.create(dataFake)
        // console.log(newVoucher);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}