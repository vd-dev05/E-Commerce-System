import mongoose from "mongoose";
import { Schema } from "mongoose";
const orderModel = mongoose.Schema({
    userId : { type: Schema.Types.ObjectId, ref: 'user' },
    address : { type: String },
    phone : { type: String },
    note : { type: String },
    products : [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        salePrice: {
            type: Number,
            min: 0,
        },
        attributes: [
            {
                name: {
                    type: String,
                    required: true,
                    trim: true,
                },
                value: {
                    type: String,
                    required: true,
                    trim: true,
                },
            },
        ],
    },],
    orderDate : {
        type : Date,
        default : Date.now()
    },
    orderUpdateDate : {
        type : Date,
        default : Date.now()
    },
    paymentStatus: {
        type: String,
        enum: ['cash', 'paid', 'unpaid'],
        default: 'unpaid'
    },
    paymentMeThod : {
         type : String,
        enum : ['paypal', 'momo', 'qrcode', 'cod', 'bank_transfer', 'bank_ecom', 'default']
    } ,
    totalAmount : {
        type : Number,
        required: true,
        min: 0,
    },
    isStatus :{
        type : String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    }
})

const OrderModel = mongoose.model('order', orderModel)

export default OrderModel