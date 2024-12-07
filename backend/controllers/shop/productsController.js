import ProductModel from "../../models/productModel.js";


const getFilteredProducts = async (req, res) => {
    try {

        const { category = [], brand = [], subCategory = [], sortBy = "default" } = req.query

        let filters = {}

        if (category.length) {
            filters.category = { $in: category.split(',') }
        }

        if (brand.length) {
            filters.brand = { $in: brand.split(',') }
        }
        if (subCategory.length) {
            filters.subCategory = { $in: subCategory.split(',') }
        }

        let sort = {}

        switch (sortBy) {

            case 'lowtohigh':
                sort.price = 1

                break;
            case 'hightolow':
                sort.price = -1

                break;
            case 'atoz':
                sort.title = 1

                break;
            case 'ztoa':
                sort.title = -1
                break;

            default:

                break;
        }

        const products = await ProductModel.find(filters).sort(sort)

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

const getProductsById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await ProductModel.findById(id);
        if (!product) {
            return res.json({
                success: false,
                message: 'Product not found'
            })
        }
        res.json({
            success: true,
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

export { getFilteredProducts, getProductsById }
