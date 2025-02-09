import mongoose, { Schema } from "mongoose"

const ratingSchema = mongoose.Schema({
    ratingId : { type: Schema.Types.ObjectId, ref: 'product' },
    userId : { type: Schema.Types.ObjectId, ref: 'user' },
    rating : { type: Number },
    des : {type : String ,  required: true},
    status : {type : Boolean, default : false},
}, { timestamps: true })

const Rating = mongoose.model('rating', ratingSchema)

export default Rating