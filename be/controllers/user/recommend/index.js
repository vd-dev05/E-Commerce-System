import { ErrorNotFoundResponse } from "../../../error/errorResponse.js"
import ProductModel from "../../../models/shop/productModel.js";

const RecommendController =  {
    listArray : async (req,res) => {
        try {
            // const { category } = req.body;
            // console.log(req.body);
            const {obj} = req.body
            const category  = JSON.parse(obj)
            let arr = []
       
            category.sort((a,b) => b.date - a.date);
            category.slice(0,3).forEach(element => {
                arr.push(element.path)
            });
           
            
            if (!arr || !category || !Array.isArray(arr) || arr.length === 0) {
                return res.status(402).json("Category not found or invalid");
            }
            
            
            const products = await ProductModel.find({ category: { $in: arr} })
            // .populate({
            //     path: 'products.product',
            //     select: '_id name images.mainImage category',
            // }); 
            
            res.status(200).json(products);
            

        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    }
   }
export default RecommendController