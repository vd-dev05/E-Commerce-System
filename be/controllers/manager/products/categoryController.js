import CategoryModel from "../../../models/shop/categoryModel.js"
import ManagerModel from "../../../models/shop/managerModel.js"

const createCategoryByManager = async (req, res) => {
    try {
        const { managerId, items } = req.body;

        if (!managerId || !items || !items.code || !items.category_name) {
            return res.status(400).json({
                success: false,
                message: "Thiếu thông tin bắt buộc",
            });
        }

        const manager = await ManagerModel.findById(managerId);
        if (!manager) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy manager",
            });
        }

        const category = await CategoryModel.findOne({ managerId })
        if (!category) {
            const newCategory = new CategoryModel({
                managerId,
                items: [items]
            });
            await newCategory.save();
            return res.json({
                success: true,
                message: 'Tạo danh mục mới thành công',
                data: newCategory
            })
        }

        const codeExits = category.items.some((item) => item.code === items.code)
        if (codeExits) {
            return res.json({
                success: false,
                message: 'Mã mặt hàng đã tồn tại trong cửa hàng'
            })
        }
        const nameExits = category.items.some((item) => item.category_name === items.category_name)
        if (nameExits) {
            return res.json({
                success: false,
                message: 'Tên mặt hàng đã tồn tại trong cửa hàng'
            })
        }

        category.items.push({
            code: items.code,
            category_name: items.category_name
        })
        await category.save()

        res.json({
            success: true,
            message: 'Thêm danh mục mới thành công',
            data: category,
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
            data: category,
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
        const { managerId, code, category_name } = req.body;
        const category = await CategoryModel.findOne({ managerId });
        if (!category) {
            return res.json({
                success: false,
                message: 'Category not found'
            })
        }
        const item = category.items.find(item => item.code === code);
        item.category_name = category_name;
        category.save()
        res.json({
            success: true,
            message: 'Cập nhập mục hàng thành công',
            data: category
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
        const { managerId } = req.params;

        const category = await CategoryModel.findOne({ managerId });
        if (!category) {
            return res.json({
                success: false,
                message: 'Category not found',
            });
        }

        res.json({
            success: true,
            data: category.items,
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