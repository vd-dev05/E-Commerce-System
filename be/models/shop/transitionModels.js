import mongoose from "mongoose";
import { Schema } from "mongoose";
const transitionSchema = mongoose.Schema({
    userId : { type: Schema.Types.ObjectId, ref: 'user' },
    date : { type: Date },
    coin : {
        type: Number,
        required: true
    },
    type : {
        type : String,
        enum : ['paypal', 'momo', 'qrcode'],
        required : true
    },
    status : {type : Boolean, default : false},
    transactionType: { type: String, enum: ['add', 'subtract' ,'transfer'], required: true },
}, { timestamps: true })

const Transition = mongoose.model('transition', transitionSchema)

export default Transition