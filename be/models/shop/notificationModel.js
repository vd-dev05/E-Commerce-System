import mongoose from "mongoose";
import { Schema } from "mongoose";
const promotionNotificationSchema = mongoose.Schema({
    promotionTitle : { type: String, required: true },
    promotionDescription : { type: String, required: true },
    discountCode: {
        type: String,
        required: true,
        unique : true
      },
    startDate : { type: Date, required: true , default : Date.now() },
    endDate : { type: Date, required: true  },
    voucherQuantity: { type: Number, required: true, default: 0 },
    discountType: { 
      type: String, 
      enum: ['percentage', 'fixed'], 
      required: true 
    },
    discountAmount: { type: Number, required: true },
    readStatus : [{
        userID  : { type: Schema.Types.ObjectId, ref: 'user' },
        read : {type : Boolean, default : false},
    }],
    readAt : { type: Date, default: Date.now() },
    rolerVoucher : { type: String, enum: ['all', 'user_month','user_year', 'user_voucher'], required: true ,default : 'all' },
    roleCustomer : { type: String, enum: ['admin', 'manager'], required: true ,default : 'admin'},
    totalUser : { type : Number , required : true , default : 0}
}, { timestamps: true })

const  notificationSchema = mongoose.Schema({
    promotionTitle : { type: String, required: true },
    promotionDescription : { type: String, required: true },
    promotionImage : {type : String , required : true},
    isDelete : { type: Boolean, default: false },
    readStatus : [{
        userID  : { type: Schema.Types.ObjectId, ref: 'user' },
        read : {type : Boolean, default : false},
    }],
    readAt : { type: Date, default: Date.now() },
    totalUser : { type : Number , required : true , default : 0}
    
},{timestamps : true}) 

const Notification = mongoose.model('notification', promotionNotificationSchema)
const NotificationUser = mongoose.model('notificatioUser' ,notificationSchema )
export { 
    Notification ,
    NotificationUser

}