import CategoryModel from "../../../models/shop/categoryModel.js"
import ManagerModel from "../../../models/shop/managerModel.js"

const createCategoryByManager = async (req, res) => {
    try {
        const { managerId, code, name } = req.body

        const manager = await ManagerModel.findById(managerId)
        if (!manager) {
            return res.json({
                success: false,
                message: 'Manager not found'
            })
        }

        const category = await CategoryModel.findOne({ managerId })
        if (!category) {

            const newCategory = new CategoryModel({
                managerId,
                items: [{ code, name }]
            });
            await newCategory.save();
            return res.json({
                success: true,
                message: 'Tạo danh mục hàng thành công',
                category: newCategory
            })
        }

        const codeExits = category.items.some((item) => item.code === code)
        if (codeExits) {
            return res.json({
                success: false,
                message: 'Mã mặt hàng đã tồn tại trong cửa hàng'
            })
        }
        const nameExits = category.items.some((item) => item.name === name)
        if (nameExits) {
            return res.json({
                success: false,
                message: 'Tên mặt hàng đã tồn tại trong cửa hàng'
            })
        }

        category.items.push({ code, name })
        await category.save()

        res.json({
            success: true,
            message: 'Thêm danh mục mới thành công',
            category,
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const deleteCategoryByManager = async (req, res) => {
    try {
        const { managerId, code } = req.body;

        const category = await CategoryModel.findOne({ managerId });
        if (!category) {
            return res.json({
                success: false,
                message: 'Category not found'
            })
        }

        category.items = category.items.filter((item) => item.code !== code);

        await category.save()
        res.json({
            success: true,
            message: 'Xóa mục hàng thành công',
            category,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const updateCategoryByManager = async (req, res) => {
    try {
        const { managerId, code, name } = req.body;

        const category = await CategoryModel.findOne({ managerId });
        if (!category) {
            return res.json({
                success: false,
                message: 'Category not found'
            })
        }
        const item = category.items.find(item => item.code === code);
        item.name = name;

        res.json({
            success: true,
            message: 'Cập nhập mục hàng thành công',
            category
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const listCategoryByManager = async (req, res) => {
    try {
        const { managerId } = req.query;

        const category = await CategoryModel.findOne({ managerId });
        if (!category) {
            return res.json({
                success: false,
                message: 'Category not found',
            });
        }

        res.json({
            success: true,
            items: category.items,
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
}

export { createCategoryByManager, deleteCategoryByManager, updateCategoryByManager, listCategoryByManager }