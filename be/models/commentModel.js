import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
    productId: String,
    userId: String,
    username: String,
    reviewMessage: String,
    reviewValue: Number

}, {
    timestamps: true
}
)

const CommentModel = mongoose.model('comment', commentSchema)

export default CommentModel