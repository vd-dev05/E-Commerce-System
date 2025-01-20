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
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    salePrice: {
        type: Number,
        min: 0,
        validate: {
            validator: function (value) {
                return value <= this.price;
            },
            message: 'Giá giảm không được lớn hơn giá gôc',
        },
    },
    images: {
        mainImage: {
            type: String,
            required: true,
        },
        additionalImages: [String],
    },
    attributes: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            values: [
                {
                    value: {
                        type: String,
                        required: true,
                        trim: true,
                    },
                    quantity: {
                        type: Number,
                        required: true,
                        min: 0,
                    },
                },
            ],
        },
    ],

}, { timestamps: true });

const ProductModel = mongoose.model('product', ProductSchema);

export default ProductModel


// const brandsSchema = mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
// }, { timestamps: true, id: false })

// const imagesSchema = new Schema({
//     url: { type: String, required: true },
// }, { timestamps: true, id: false })

// const videoSchema = new Schema({
//     url: { type: String, required: true },
// }, { timestamps: true, id: false })

// const discountSchema = new Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     discount: { type: Number, required: true },
//     discount_type: ["percent", "price"],
// }, { timestamps: true, id: false })

// const attributesSchema = new Schema({
//     name: { type: String, required: true },
//     value: { type: String, required: true },
// }, { timestamps: true, id: false })

// const productvariantsSchema = new Schema({
//     sku: { type: String, required: true },
//     price: { type: Number, required: true },
//     quantity: { type: Number, required: true },
//     images: [imagesSchema],
//     video: [videoSchema],
//     discount: [discountSchema],
//     attributes: [attributesSchema]
// }, { timestamps: true, id: false })

// const reviewSchema = new Schema({
//     name: { type: String, required: true, ref: 'user' },
//     avartar: { type: String, required: true, ref: 'user' },
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//     media_url: [{ type: String, required: true }],
//     media_type: ["image", "video"],
// }, { timestamps: true, id: false })

// const productsSchema = new Schema({
//     categrory_id: {
//         type: Schema.Types.ObjectId,
//         ref: 'brands',
//         required: true
//     },
//     variants: [productvariantsSchema],
//     review: [reviewSchema],
// }, { timestamps: true })

// const ProductModel = mongoose.model('products', productsSchema)
// export const BrandsModel = mongoose.model('brands', brandsSchema)
// export default ProductModel
