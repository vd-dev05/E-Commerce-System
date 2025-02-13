import { CommentSort } from "../../../config/index.js"
import { ErrorNotFoundResponse } from "../../../error/errorResponse.js"
import UserModel from "../../../models/auth/userModel.js"
import CommentModel from "../../../models/shop/commentModel.js"

const CommentController = {
    createComment : async (req, res) => {
        try {
            const {content  } = req.body
            const productId = req.params.id
            
            const checkComment = CommentSort.some(comment => content.toLowerCase().includes(comment.toLowerCase()))
            if (checkComment) {
                const commentBlock = CommentModel.create({
                    userId : req.user.id,
                    productId : productId,
                    isBlock : true,
                    message : content
                })
                if (commentBlock) {
                    await UserModel.findOneAndUpdate(
                        { _id: req.user.id },
                        { $inc: { countBlock: 1 } },
                        { new: true }
                    )
                    return res.status(400).json({ message: "Bạn đã vi phạm chính sách đánh giá", success : false })
                }
            
            } else {
                const comment = CommentModel.create({
                    userId : req.user.id,
                    productId : productId,
                    isBlock : false,
                    message : content
                })
                if (comment) {
                    return res.status(200).json({ message: "Thêm bình luận thành công", success : true })
                }
            }
            
            
            
        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    },
    getCommentProductId : async (req,res) => {
        try {
            const {id} = req.params
            const comment = await CommentModel.find({productId : id , isBlock : false}).populate('userId' , '_id avartar username ')
            res.status(200).json({comment})
        } catch (error) {
            ErrorNotFoundResponse(res, error)
        }
    }
}
export default CommentController