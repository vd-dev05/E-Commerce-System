import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'manager',
        required: true
    },
    items: [
        {
            code: {
                type: String,
                required: true,
                validate: {
                    validator: function (value) {
                        const codes = this.items.map(item => item.code);
                        return codes.filter(code => code === value).length === 1
                    },
                    message: 'Mã mặt hàng đã tồn tại trong cửa hàng'
                }
            },
            category_name: {
                type: String,
                required: true,
                validate: {
                    validator: function (value) {
                        const category_names = this.items.map(item => item.name);
                        return category_names.filter(name => name === value).length === 1
                    },
                    message: 'Tên mặt hàng đã tồn tại trong cửa hàng'
                }
            }
        }
    ]
}, { timestamps: true })

categorySchema.index({ managerId: 1 })

const CategoryModel = mongoose.model('managerCategory', categorySchema)

export default CategoryModel