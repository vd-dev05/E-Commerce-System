import ProductModel from "../../models/productModel.js";

const getFilteredProducts = async (req, res) => {
    try {
        const { category = [], brand = [], subCategory = [], sortBy = "default", page = 1, limit = 12, search } = req.query;

        let filters = {};
        if (category.length) filters.category = { $in: category.split(',') };
        if (brand.length) filters.brand = { $in: brand.split(',') };
        if (subCategory.length) filters.subCategory = { $in: subCategory.split(',') };

        if (search) {
            const regEx = new RegExp(search, 'i');
            filters.$or = [
                { title: regEx },

            ];
        }

        let sort = {};
        switch (sortBy) {
            case 'lowtohigh': sort.price = 1; break;
            case 'hightolow': sort.price = -1; break;
            case 'atoz': sort.title = 1; break;
            case 'ztoa': sort.title = -1; break;
        }

        const skip = (page - 1) * limit;

        const [products, totalProducts] = await Promise.all([
            ProductModel.find(filters).sort(sort).skip(skip).limit(Number(limit)),
            ProductModel.countDocuments(filters),
        ]);

        res.json({
            success: true,
            data: products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


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
