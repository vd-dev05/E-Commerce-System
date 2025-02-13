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
            ref: 'product',
            required: true,
        },
        // quantity: {
        //     type: Number,
        //     required: true,
        //     min: 1,
        // },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        salePrice: {
            type: Number,
            min: 0,
        },
        variants: [
            {
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
                        _id: false
                    },
                ],
                quantity: { type: Number, required: true, min: 0 },
                priceBeta: { type: Number, required: true, min: 0 }, 
            }
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
        enum : ['paypal', 'momo', 'qrcode', 'cod', 'bank_transfer', 'bank_ecom', 'default'],
        default : 'default',
        require : true
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