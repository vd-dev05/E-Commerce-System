import mongoose from "mongoose";
import { Schema } from "mongoose";
const orderModel = mongoose.Schema({
    userId : { type: Schema.Types.ObjectId, ref: 'user' },
    address : { type: String },
    phone : { type: String },
    note : { type: String },
    products : [{}],
    // isOrder : { type: Boolean, default: false }
})

const OrderModel = mongoose.model('order', orderModel)

export default OrderModel