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
            .populate("managerId" , '-updatedAt -role -phone -email -password')
            res.status(200).json({product}) 
        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    },
    getQueryCategory : async (req,res) => {
        try {
            const {query} = req.query
            const pareQuery = JSON.parse(query)
         
            if (pareQuery) {
                let query = {}
                if (pareQuery.category) {
                    const pareQueryCategory = decodeURI(pareQuery.category)
                    query.category = pareQueryCategory
                }
                if (pareQuery.minPrice && pareQuery.maxPrice) {
                    query.price = {
                        $gte: Number(pareQuery.minPrice),
                        $lte: Number(pareQuery.maxPrice)
                    }
                }
                if (pareQuery.ratingFilter) {
                    query["imdb.rating"] = {
                        $gte: pareQuery.ratingFilter
                    }
                }
                if (pareQuery.sale === 'true') {
                    query.salePrice = {
                        $gt: 0
                    }
                }
                let sort = {}
                if (pareQuery.sort === 'asc' || !pareQuery.sort) {
                    sort.price = 1
                } else if (pareQuery.sort === 'desc') {
                    sort.price = -1
                } 
              
                const products = await ProductModel.find(query)
                .sort(sort)     
                res.status(200).json({products , success : true , total : products.length}) 


            } else {
                res.status(400).json({message : "Query not found"})
            }
            // const products = await ProductModel.find({category : query})
            // res.status(200).json({products}) 
        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    },
    createProductSale : async (req,res) => {

        try {
           
            const products = await getNewSaleProducts();
            res.json({
                products,
                count : products.length
            });
            // console.log(products);
         
            
            
        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    }
}
let usedCategories = new Set(); // Lưu danh mục đã dùng

async function getNewSaleProducts() {
    let availableCategories = await ProductModel.aggregate([
        { $group: { _id: "$category" } }, // Lấy tất cả danh mục
        { $match: { _id: { $nin: Array.from(usedCategories) } } }, // Loại bỏ danh mục đã dùng
        { $sample: { size: 12 } } // Lấy 12 danh mục mới
    ]);

    if (availableCategories.length < 12) {
        usedCategories.clear(); // Reset nếu hết danh mục
        return getNewSaleProducts(); // Gọi lại để lấy danh mục mới
    }

    let newCategories = availableCategories.map(c => c._id);
    usedCategories = new Set([...usedCategories, ...newCategories]); // Cập nhật danh mục đã dùng

    return ProductModel.find({ category: { $in: newCategories } }).limit(12);
}
export default Products