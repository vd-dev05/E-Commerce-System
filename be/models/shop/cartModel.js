import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true, 
    },
    items: [
        {
            _id : false,
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
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
                    _id : false
                },
            ],
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {timestamps:true});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart