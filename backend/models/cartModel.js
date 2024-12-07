import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product', required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
})

const CartModel = mongoose.model('cart', cartSchema)

export default CartModel