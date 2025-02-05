import mongoose from "mongoose";
import { Schema } from "mongoose";
const voucherSchema = mongoose.Schema({
    userId : { type: Schema.Types.ObjectId, ref: 'user',required: true },
    name : { type: String },
    title: { type: String, required: true },
    des: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    discountType: { 
      type: String, 
      enum: ['percentage', 'fixed'], 
      required: true 
    },
    type : {
        type : String,
        enum : ['all', 'shop','ecom'],
        required: true 
    },
    discountAmount: { type: Number, required: true },
    isClaimed: { type: Boolean, default: false },
    code : { type : String, unique : true, required : true }
    
}, { timestamps: true })

const Voucher = mongoose.model('voucher', voucherSchema)

export default Voucher