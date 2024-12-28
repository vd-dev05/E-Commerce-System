import CommentModel from "../../models/commentModel.js";
import OrderModel from "../../models/orderModel.js";
import ProductModel from "../../models/productModel.js";


const createProductComment = async (req, res) => {
    try {

        const { productId, userId, username, reviewMessage, reviewValue } = req.body;

        // const order = await OrderModel.findOne({
        //     userId,
        //     "cartItems.productId": productId

        // })
        // if (!order) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "You need to purchase product to review it.",
        //     });
        // }

        const newComment = new CommentModel({
            productId,
            userId,
            username,
            reviewMessage,
            reviewValue,
        });

        await newComment.save()

        const comments = await CommentModel.find({ productId });
        const totalCommentLength = comments.length;
        const averageComment = comments.reduce((sum, commentItem) => sum + commentItem.reviewValue, 0) / totalCommentLength;

        await ProductModel.findByIdAndUpdate(productId, { averageComment })

        res.json({
            success: true,
            data: newComment
        })



    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const getProductComment = async (req, res) => {
    try {
        const { productId } = req.params;

        const comments = await CommentModel.find({ productId });
        res.json({
            success: true,
            data: comments,
        });


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { createProductComment, getProductComment }