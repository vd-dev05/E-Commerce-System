import { imageUpload } from "../../config/cloudinary.js";
import ProductModel from "../../models/productModel.js";


const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUpload(url);

        res.json({
            success: true,
            result
        })


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const createProduct = async (req, res) => {
    try {

        const { image, title, description, category, subCategory, brand, price, salePrice, totalStock } = req.body

        const newProduct = new ProductModel({
            image,
            title,
            description,
            category,
            subCategory,
            brand,
            price,
            salePrice: salePrice === "" ? 0 : salePrice,
            totalStock
        })

        await newProduct.save();

        res.json({
            success: true,
            message: "Product added successful!",
            data: newProduct
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const fetchAllProducts = async (req, res) => {
    try {

        const products = await ProductModel.find({})

        res.json({
            success: true,
            data: products
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, description, category, subCategory, brand, price, salePrice, totalStock } = req.body

        let product = await ProductModel.findById(id);
        if (!product) {
            return res.json({
                success: false,
                message: 'Product not found'
            })
        }

        product.title = title || product.title;
        product.description = description || product.description;
        product.category = category || product.category;
        product.subCategory = subCategory || product.subCategory;
        product.brand = brand || product.brand;
        product.price = price === "" ? 0 : price || product.price;
        product.salePrice = salePrice === "" ? 0 : salePrice || product.salePrice;
        product.totalStock = totalStock || product.totalStock;
        product.image = image || product.image;

        await product.save();

        res.json({
            success: true,
            message: 'Product update successful!',
            data: product
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await ProductModel.findByIdAndDelete(id)
        res.json({
            success: true,
            message: "Product remove successful!"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { handleImageUpload, createProduct, fetchAllProducts, updateProduct, deleteProduct }