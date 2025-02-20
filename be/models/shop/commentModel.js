import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    productId: { type: Schema.Types.ObjectId, ref: 'product' },
    isBlock : {type : Boolean, default : false},
    message: { type: String, required: true },
    create_at: { type: Date, default: Date.now() },
    update_at: { type: Date, default: Date.now() }
})

const CommentModel = mongoose.model('comment', commentSchema)
export default CommentModel