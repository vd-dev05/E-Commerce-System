import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true , sparse: true },
    birthday: { type: Date },
    gender: { type: String },
    password: { type: String },
    role: { type: String, default: 'user' },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    last_login: { type: Date, default: Date.now },
    is_temporary: { type: Boolean, default: false },
    avartar: { type: String },
    address: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'address'
        }
    ],
    product : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    ],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'order' }],
    coin : { type: Number, default: 0 },
    avartar : { type: String },
    coinTransaction : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'transition'
        }
    ],
    historySearch : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'search'
        }
    ],    
    countBlock : { type: Number, default: 0 },
    deleteCount : { type: Number },
    favoriteProducts : [{type : mongoose.Schema.Types.ObjectId , ref : 'product'}],
    isLoginGoogle : { type: Boolean, default: false },
    googleId: { type: String, unique: true },
    isPasswordSet: { type: Boolean, default: false }, // Chỉ đánh dấu nếu người dùng đã thiết lập mật khẩu
    isLoginFacebook : { type: Boolean, default: false },
}, { timestamps: true })

userSchema.methods.setPassword = function(password) {
    this.password = password ;
    this.isPasswordSet = true ;
}
const UserModel = mongoose.model('user', userSchema)

export default UserModel
