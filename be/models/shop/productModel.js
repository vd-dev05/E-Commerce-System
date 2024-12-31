import mongoose, { Schema }  from "mongoose";

const brandsSchema = mongoose.Schema({
    name: { type: String, required: true },
    description : { type: String, required: true },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
}, { timestamps: true , id : false})

const imagesSchema =new Schema({
    url: { type: String, required: true },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
}, { timestamps: true , id : false})

const videoSchema  =new Schema({
    url: { type: String, required: true },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
}, { timestamps: true , id : false})

const discountSchema =new Schema({
    name: { type: String, required: true },
    description : { type: String, required: true },
    discount: { type: Number, required: true },
    discount_type: ["percent", "price"],
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
}, { timestamps: true , id : false})

const attributesSchema =new Schema({
    name: { type: String, required: true },
    value : { type: String, required: true },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
}, { timestamps: true , id : false})

const productvariantsSchema =new Schema({
    sku: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    images : [imagesSchema],
    video  : [videoSchema],
    discount :[discountSchema],
    attributes : [attributesSchema]
}, { timestamps: true , id : false})

const reviewSchema =new Schema({
    name: { type: String, required: true , ref : 'user' },
    avartar : { type: String, required: true , ref : 'user' },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    media_url : [{ type: String, required: true }],
    media_type : ["image", "video"],
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
}, { timestamps: true , id : false})

const productsSchema =new Schema({
    categrory_id : {
        type: Schema.Types.ObjectId,
        ref: 'brands',
        required: true
    },
    variants : [productvariantsSchema],
    review : [reviewSchema],
}, { timestamps: true })

const ProductModel = mongoose.model('products',  productsSchema)
export const BrandsModel = mongoose.model('brands',  brandsSchema)
export default ProductModel 
// data fake 
// {
//     "categrory_id": {
//       "name": "Electronics",
//       "description": "All electronics products",
//       "create_at": "2024-12-31T12:00:00Z",
//       "update_at": "2024-12-31T12:00:00Z"
//     },
//     "variants": [
//       {
//         "sku": "ABC123",
//         "price": 299.99,
//         "quantity": 150,
//         "create_at": "2024-12-31T12:00:00Z",
//         "update_at": "2024-12-31T12:00:00Z",
//         "images": [
//           {
//             "url": "https://example.com/images/product1.jpg",
//             "create_at": "2024-12-31T12:00:00Z",
//             "update_at": "2024-12-31T12:00:00Z"
//           },
//           {
//             "url": "https://example.com/images/product2.jpg",
//             "create_at": "2024-12-31T12:00:00Z",
//             "update_at": "2024-12-31T12:00:00Z"
//           }
//         ],
//         "video": [
//           {
//             "url": "https://example.com/videos/product1.mp4",
//             "create_at": "2024-12-31T12:00:00Z",
//             "update_at": "2024-12-31T12:00:00Z"
//           }
//         ],
//         "discount": [
//           {
//             "name": "Winter Sale",
//             "description": "Get 20% off on all electronics.",
//             "discount": 20,
//             "discount_type": "percent",
//             "create_at": "2024-12-31T12:00:00Z",
//             "update_at": "2024-12-31T12:00:00Z"
//           }
//         ],
//         "attributes": [
//           {
//             "name": "Color",
//             "value": "Black",
//             "create_at": "2024-12-31T12:00:00Z",
//             "update_at": "2024-12-31T12:00:00Z"
//           },
//           {
//             "name": "Size",
//             "value": "Medium",
//             "create_at": "2024-12-31T12:00:00Z",
//             "update_at": "2024-12-31T12:00:00Z"
//           }
//         ]
//       }
//     ],
//     "review": [
//       {
//         "name": "John Doe",
//         "avartar": "https://example.com/avatars/johndoe.jpg",
//         "rating": 4,
//         "comment": "Great product, but a bit expensive.",
//         "media_url": ["https://example.com/reviews/review1.jpg"],
//         "media_type": "image",
//         "create_at": "2024-12-31T12:00:00Z",
//         "update_at": "2024-12-31T12:00:00Z"
//       },
//       {
//         "name": "Jane Smith",
//         "avartar": "https://example.com/avatars/janesmith.jpg",
//         "rating": 5,
//         "comment": "Absolutely love this product! Worth the price.",
//         "media_url": ["https://example.com/reviews/review2.jpg"],
//         "media_type": "image",
//         "create_at": "2024-12-31T12:00:00Z",
//         "update_at": "2024-12-31T12:00:00Z"
//       }
//     ]
//   }
  