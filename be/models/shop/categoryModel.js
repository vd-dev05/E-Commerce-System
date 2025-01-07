import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    category_name: {
        type: String,
        required: true,
    },
}, { _id: false });

const categorySchema = mongoose.Schema({
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'manager',
        required: true,
        index: true,
    },
    items: [itemSchema],
}, { timestamps: true });


categorySchema.index(
    { managerId: 1, 'items.code': 1 },
    { unique: true, partialFilterExpression: { 'items.code': { $exists: true } } }
);
categorySchema.index(
    { managerId: 1, 'items.category_name': 1 },
    { unique: true, partialFilterExpression: { 'items.category_name': { $exists: true } } }
);

const CategoryModel = mongoose.model('managerCategory', categorySchema);

export default CategoryModel;
