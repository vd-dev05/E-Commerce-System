import { ErrorResponse } from "../../../error/errorResponse.js"
import OrderModel from "../../../models/shop/orderModels.js"
import UserModel from "../../../models/auth/userModel.js"
import { get, Schema } from "mongoose"
import mongoose from "mongoose";
const OrderController = {
    addOrder: async (req, res) => {
        try {
            const dataOrder = {
                userId: "677d5901b5fceb6a3ce4bf5d",
                address: "",
                phone: "",
                note: "",
                products: [
                    {
                        productId: "6777a1eb38abf9bcc1feb941",
                        quantity: 1,
                        isOrder: false,
                    }
                ],
             
                _id: new mongoose.Types.ObjectId()
            }
            const order = await OrderModel.create(dataOrder)
            const user = await UserModel.findById("677d5901b5fceb6a3ce4bf5d").select('cart').populate('cart')
            user.cart.push(order._id)
            await user.save()
            console.log(user    );
            
        } catch (error) {
            ErrorResponse(res, error)
        }
    },
    getOrder: async (req, res) => {
        try {
            const user = await OrderModel.findOne({userId : '677d5901b5fceb6a3ce4bf5d'})
            res.json(user)
        } catch (error) {
            ErrorResponse(res, error)
        }
    }
}
export default OrderController