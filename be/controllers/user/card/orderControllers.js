import { ErrorResponse } from "../../../error/errorResponse.js"
import OrderModel from "../../../models/shop/orderModels.js"
import UserModel from "../../../models/auth/userModel.js"
import { get, Schema } from "mongoose"
import mongoose from "mongoose";
import ProductModel from "../../../models/shop/productModel.js";
const OrderController = {
    addOrder: async (req, res) => {
        try {
            const { totalAmount, paymentStatus, paymentEcom, paymentMeThod, dataProduct, paymentSuccess } = req.body

            const arr = req.body.dataProduct?.map(item => ({
                productId: item.productId._id,
                salePrice: item.salePrice,
                price: item.price,
                variants: {
                    attributes: item?.variants[0]?.attributes.map((i) => ({
                        name: i.name,
                        value: i.value
                    })),
                    quantity: item?.variants[0]?.quantity,
                    priceBeta: item?.variants[0]?.priceBeta,
                },


            }));

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
            const checkOrder = await OrderModel.findOne({ userId: req.user.id, "products.productId": { $in: arr.map(item => item.productId) } })
            
            if (checkOrder) return res.status(200).json({success: false , message : "Order tồn tại" , order : checkOrder})
            
            if (data) {
                const order = new OrderModel(data)
                if (order) {
                    const productIds = dataProduct.map(item => item.productId._id);
                    const checkProducts = await ProductModel.find({ _id: { $in: productIds } });
                    // console.log(checkProducts);

                    if (checkProducts && paymentStatus === "paid" && paymentSuccess === true) {
                        checkProducts.forEach(product => {
                            product.variants.forEach(item => {
                                item.values.forEach(value => {
                                    const orderProduct = arr.find(orderItem =>
                                        orderItem.productId.toString() === product._id.toString() &&
                                        orderItem.attributes.some(attr => attr.name === item.name && attr.value === value.value)
                                    );
                                    if (orderProduct) {
                                        value.quantity -= orderProduct.quantity;
                                        if (value.quantity < 0) {
                                            value.quantity = 0;
                                        }
                                    }
                                });

                                product.save();

                            });


                        });


                    }

                    if (checkProducts && paymentSuccess === false) {
                        // await order.save()

                        res.status(200).json({
                            message: "Order created successfully",
                            //   order ,
                            success: true
                        });
                    }
                } else {
                    res.status(404).json({ message: "not found Order", success: false })
                }
            }

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