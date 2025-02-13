import { ErrorNotFoundResponse } from "../../../error/errorResponse.js"
import ProductModel from "../../../models/shop/productModel.js"
const Products = {
    getAllProducts: async (req, res) => {
        try {
            const product = await ProductModel.find({})
            res.status(200).json({product})
            
        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    },
    getQueryProducts : async (req,res) => {
        try {
            // const fake = "Thời Trang Nam"
            const {query} = req.query
            // console.log(query);
            if (!query) {

            }
            const products = await ProductModel.find({category : query})

            // console.log(products);
            
            res.status(200).json({products}) 
        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    },
    getProductById : async (req,res) => {
        try {
            const {id} = req.params
            const product = await ProductModel.findById(id)
            res.status(200).json({product}) 
        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    }
}
export default Products