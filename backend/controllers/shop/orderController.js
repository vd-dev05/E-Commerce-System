import paypal from '@paypal/checkout-server-sdk';
import client from '../../config/paypal.js';
import OrderModel from '../../models/orderModel.js'
import CartModel from '../../models/cartModel.js';
import ProductModel from '../../models/productModel.js'

const createOrder = async (req, res) => {
    try {

        const {
            userId,
            cartId,
            cartItems,
            address,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId
        } = req.body;

        const itemTotal = cartItems.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0).toFixed(2);

        if (paymentMethod === 'COD') {

            const newCreateOrder = new OrderModel({
                userId,
                cartId,
                cartItems,
                address,
                orderStatus,
                paymentMethod,
                paymentStatus,
                totalAmount,
                orderDate,
                orderUpdateDate
            });

            await newCreateOrder.save();

            res.json({
                success: true,
                message: 'Order placed successfully with COD.',
                orderId: newCreateOrder._id
            })

        } else if (paymentMethod === 'PayPal') {

            const request = new paypal.orders.OrdersCreateRequest();
            request.prefer('return=representation')
            request.requestBody({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: totalAmount.toFixed(2),
                            breakdown: {
                                item_total: {
                                    currency_code: 'USD',
                                    value: itemTotal, // Total of item prices
                                },
                            }
                        },
                        description: 'Order Payment',
                        items: cartItems.map(item => ({
                            name: item.title,
                            unit_amount: {
                                currency_code: 'USD',
                                value: item.price.toFixed(2),
                            },
                            quantity: item.quantity.toString(),
                        }))
                    }
                ],
                application_context: {
                    return_url: 'http://localhost:5173/shop/paypal-return',
                    canel_url: 'http://localhost:5173/shop/paypal-canel'
                }
            })

            const order = await client.execute(request)

            const newCreateOrder = new OrderModel({
                userId,
                cartId,
                cartItems,
                address,
                orderStatus,
                paymentMethod,
                paymentStatus,
                totalAmount,
                orderDate,
                orderUpdateDate,
                paymentId,
                payerId
            })

            await newCreateOrder.save();

            const approvalURL = order.result.links.find(link => link.rel === 'approve').href;

            res.json({
                success: true,
                approvalURL,
                orderId: newCreateOrder._id
            })
        }


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const capturePayment = async (req, res) => {
    try {
        const { paymentId, payerId, orderId } = req.body;

        let order = await OrderModel.findById(orderId);

        if (!order) {
            return res.json({
                success: false,
                message: 'Order can not be found'
            })
        }

        if (order.paymentMethod === 'COD') {
            order.paymentStatus = 'UnPaid';
            order.orderStatus = 'Completed';

        } else if (order.paymentMethod === 'PayPal') {
            order.paymentStatus = 'Paid';
            order.orderStatus = 'Completed';
            order.paymentId = paymentId;
            order.payerId = payerId;
        }


        for (let item of order.cartItems) {

            let product = await ProductModel.findById(item.productId)

            if (!product) {
                return res.json({
                    success: false,
                    message: `Not enough stock for this product ${item.title}`
                });
            }
            if (product.totalStock < item.quantity) {
                return res.json({
                    success: false,
                    message: `Not enough stock for product with ${item.title}.`
                });
            }
            product.totalStock -= item.quantity;
            await product.save();
        }

        const getCartId = order.cartId;
        await CartModel.findByIdAndDelete(getCartId)

        res.json({
            success: true,
            message: 'Order Completed!',
            data: order
        })

        await order.save();
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const getAllOrderByUser = async (req, res) => {
    try {

        const { userId } = req.params;

        const order = await OrderModel.find({ userId })

        if (!order.length) {
            return res.json({
                success: false,
                message: 'No orders found!'
            })
        }

        res.json({
            success: true,
            data: order
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const getOrderDetails = async (req, res) => {
    try {

        const { id } = req.params;

        const order = await OrderModel.findById(id)

        if (!order) {
            return res.json({
                success: true,
                message: 'Orders not found!'
            })
        }

        res.json({
            success: true,
            data: order
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}


export { createOrder, capturePayment, getAllOrderByUser, getOrderDetails }