import ProductModel from "../../models/productModel.js";


const searchProducts = async (req, res) => {
    try {

        const { keyword } = req.params;
        if (!keyword || typeof keyword !== 'string') {
            return res.json({
                success: false,
                message: 'Keyword is required and must be in string format'
            })
        }

        const regEx = new RegExp(keyword, 'i')

        const createSearchQuery = {
            $or: [
                { title: regEx },
                { description: regEx },
                { category: regEx },
                { subCategory: regEx },
                { brand: regEx },
            ]
        }

        const searchResult = await ProductModel.find(createSearchQuery);

        res.json({
            success: true,
            data: searchResult
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { searchProducts }