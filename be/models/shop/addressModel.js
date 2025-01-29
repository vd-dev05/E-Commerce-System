import mongoose from "mongoose";
import { Schema } from "mongoose";
const addressSchema = mongoose.Schema({
    userId : { type: Schema.Types.ObjectId, ref: 'user' },
    name : { type: String },
    phone : { type: String },
    address : { type: String },
    is_default : { type: Boolean, default : false},
    status : {type : Boolean, default : false},
}, { timestamps: true })

const Address = mongoose.model('address', addressSchema)

export default Address