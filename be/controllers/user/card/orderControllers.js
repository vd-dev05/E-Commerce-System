import { ErrorResponse } from "../../../error/errorResponse.js"
import OrderModel from "../../../models/shop/orderModels.js"
import UserModel from "../../../models/auth/userModel.js"
import { get, Schema } from "mongoose"
import mongoose from "mongoose";
import ProductModel from "../../../models/shop/productModel.js";
const OrderController = {
    addOrder: async (req, res) => {
        try {
            const { totalAmount, paymentStatus, paymentEcom, paymentMeThod , dataProduct } = req.body
            const arr = req.body.dataProduct.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                salePrice: item.salePrice,
                attributes: item.attributes.map((i) => ({
                    name: i.name,
                    value: i.value
                })),
                price: item.price

            }));
            // console.log(arr);

            const data = {
                userId: req.user.id,
                address: '',
                phone: req.user.phone,
                note: '',
                products: arr,
                paymentStatus: paymentStatus,
                paymentMethod: paymentMeThod,
                paymentEcom: paymentEcom,
                totalAmount: totalAmount,
                isStatus: 'pending'
            }
            // console.log(data);
            if (data) {
                const order = new OrderModel(data)
                if (order) {
                    // console.log(order);
                    const productIds = dataProduct.map(item => item.productId._id);
                    const checkProducts = await ProductModel.find({ _id: { $in: productIds } });
                    // if (checkProducts)
                    // console.log(checkProducts);                     

                    // res.status(200).json({message : "Create Order" , success: true})
                    if (checkProducts && paymentStatus === "paid") {
                        checkProducts.forEach(product => {
                            product.attributes.forEach(item => {
                                item.values.forEach(value => {
                                    const orderProduct = arr.find(orderItem => 
                                        orderItem.productId.toString() === product._id.toString() && 
                                        orderItem.attributes.some(attr => attr.name === item.name && attr.value === value.value)
                                    );
                                    // console.log(orderProduct);
                                    console.log(value);
                                    
                                //    if (orderProduct) {
                                //         value.quantity -= orderProduct.quantity;
                                //         if (value.quantity < 0) {
                                //             value.quantity = 0;
                                //         }
                                //     } 
                                });

                                // product.save();

                            });
                           
                            
                        });
                   

                    }
                } else {
                    res.status(404).json({ message: "not found Order", success: false })
                }
            }

            // const createOrder = await OrderModel.

            // res.status(200).json("done")
            // const idProduct = "6777a1eb38abf9bcc1feb941"

            // const checkQuantityProduct = await OrderModel.findOneAndUpdate(
            //     { "products.productId": idProduct },
            //     { $inc: { "products.$.quantity": 1 } },
            //     { new: true }
            // );
            // console.log(checkQuantityProduct);
            // if (checkQuantityProduct) {
            //     res.status(200).json("done");
            //     return;
            // }
            // // const dataOrder = {
            // //     userId: "677d5901b5fceb6a3ce4bf5d",
            // //     address: "",
            // //     phone: "",
            // //     note: "",
            // //     products: [
            // //         {
            // //             productId: idProduct,
            // //             quantity: 1,
            // //             isPaid: false,
            // //         }
            // //     ],

            // //     _id: new mongoose.Types.ObjectId()
            // // }
            // const order = await OrderModel.create(dataOrder)
            // const user = await UserModel.findById("677d5901b5fceb6a3ce4bf5d").select('cart').populate('cart')
            // user.cart.push(order._id)
            // await user.save()
            // console.log(user    );

        } catch (error) {
            ErrorResponse(res, error)
        }
    },
    getOrder: async (req, res) => {
        try {
            const user = await OrderModel.findOne({ userId: '677d5901b5fceb6a3ce4bf5d' })
            res.json(user)
        } catch (error) {
            ErrorResponse(res, error)
        }
    }
}
export default OrderController