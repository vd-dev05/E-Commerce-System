import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: String,
    cartId: String,
    cartItems: [
        {
            productId: String,
            image: String,
            title: String,
            price: String,
            quantity: Number
        }
    ],
    address: {
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String

})

const OrderModel = mongoose.model('order', orderSchema);

export default OrderModel