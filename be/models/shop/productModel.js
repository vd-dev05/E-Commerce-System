import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'manager',
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
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
    currency: {
        type: String,
        required: true,
        enum: ['VND', 'USD'],
        default: 'VND',
    },
    totalStock: Number,
    images: {
        mainImage: {
            type: String,
            required: true,
        },
        additionalImages: [String],
    },

    attributes: [{
        title: String,
        options: [
            {
                name: String,
                quantity: Number,
                subAttribute: {
                    title: String,
                    options: [
                        {
                            name: String,
                            quantity: Number
                        }
                    ]
                }
            }
        ]
    }]

}, { timestamps: true });

const ProductModel = mongoose.model('product', ProductSchema);

export default ProductModel
