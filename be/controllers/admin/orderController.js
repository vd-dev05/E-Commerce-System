import OrderModel from "../../models/orderModel.js";
import UserModel from "../../models/userModel.js";


const getAllOrder = async (req, res) => {
    try {

        const order = await OrderModel.find({})

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

const getOrderDetailsForAdmin = async (req, res) => {
    try {

        const { id } = req.params;
        const { userId } = req.query;

        const order = await OrderModel.findById(id)

        if (!order) {
            return res.json({
                success: true,
                message: 'Orders not found!'
            })
        }
        let user = null;
        if (userId) {
            user = await UserModel.findById(userId).select("username email"); // Fetch only necessary fields
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found!",
                });
            }
        }

        res.json({
            success: true,
            data: order,
            user: user
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const updateOrderStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { orderStatus } = req.body;

        const order = await OrderModel.findById(id);

        if (!order) {
            return res.json({
                success: true,
                message: 'Orders not found!'
            })
        };

        await OrderModel.findByIdAndUpdate(id, { orderStatus })

        res.json({
            success: true,
            message: 'Order status is updated successful!'
        })


    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { getAllOrder, getOrderDetailsForAdmin, updateOrderStatus }