import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    last_login: { type: Date, default: Date.now },
    is_temporary: { type: Boolean, default: false },
    avartar: { type: String, required: true },
    address: [{ type: String, required: true }],
    product : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    ],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'order' }],

    
}, { timestamps: true })
const UserModel = mongoose.model('user', userSchema)

export default UserModel
