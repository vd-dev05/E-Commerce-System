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

            const arr = req.body.dataProduct?.map(item => {
                if (item?.variants?.length === 0) {
                    return {
                        productId: item.productId._id,
                        salePrice: item.salePrice,
                        price: item.price,
                        variants: {
                            attributes: [],
                            quantity: 0,
                            priceBeta: 0,
                        },
                    };
                }
                return {
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
                };
            });
            // res.json(arr)
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

            const checkOrder = await OrderModel
                .findOne({ userId: req.user.id, "products.productId": { $in: arr.map(item => item.productId) } })
                .populate({
                    path: 'products.productId',
                    select: '_id name images.mainImage price salePrice',
                    model: 'product',
                    match: {
                        _id: { $in: arr.map(item => item.productId) },
                    }
                })


            if (checkOrder) return res.status(200).json({ success: false, message: "Order tồn tại", order: checkOrder })


            if (data) {
                if (checkOrder) {
                    const productIds = dataProduct.map(item => item.productId._id);
                    const checkProducts = await ProductModel.find({ _id: { $in: productIds } });

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

                                // product.save();

                            });


                        });
                        res.status(200).json({ message: "thanh toan thanh cong", success: true })

                    } else {
                        res.status(403).json({ message: "chua du dieu kien", success: false })
                    }
                } else if (!checkOrder && paymentSuccess === false) {
                    const order = new OrderModel({ ...data, paymentMeThod: paymentMeThod })
                    await order.save()
                    res.status(200).json({
                        message: "Order created successfully",
                        order,
                        success: true
                    });
                } else {
                    res.status(404).json({ message: "not found Order", success: false })
                }
            } else {
                console.log("ko co ");

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
    getOrderById: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) throw Error("id not found")
            const order = await OrderModel.findOne({ _id: id })
                .populate({
                    path: 'products.productId',
                    select: '_id name price salePrice',
                });
        
            if (!order) {
                res.status(404).json({
                    message: "order ko dung",
                    success: false
                })
            } else {
                res.json(order)
            }


        } catch (error) {
            ErrorResponse(res, error)
        }
    },
    editAndUpdate : async (req,res) => {
        try {
            const {paymentSuccess ,  address , paymentMeThod ,  totalAmount} = req.body
            const paymentSuccessOrder = await OrderModel.findById(req.params.id)
           
            if (paymentSuccess === true) {
                const data = {
                    isStatus: "processing",
                    totalAmount,
                    paymentMeThod,
                    address,
                    paymentStatus: paymentMeThod === "cod" ? "cash" : "paid"

                }
                await paymentSuccessOrder.updateOne(data)
                res.status(200).json({
                    message: "Update order success",
                    success: true
                })
            }
            
            
        } catch (error) {
            ErrorResponse(res, error)
        }
    },
    getOrderProcess : async (req,res) => {
        try {
            const order = await OrderModel.find({isStatus : "processing" , userId : req.user.id})
            .populate({
                path: 'products.productId',
                select: '_id name ',
            });
    
            
            res.json({payment : order , total : order.length, success : true})
        } catch (error) {
            ErrorResponse(res, error)
        }
    }
}
export default OrderController