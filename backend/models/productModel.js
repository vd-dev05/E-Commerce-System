import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    category: String,
    subCategory: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number
}, {
    timestamps: true
})

const ProductModel = mongoose.model('product', productSchema)

export default ProductModel