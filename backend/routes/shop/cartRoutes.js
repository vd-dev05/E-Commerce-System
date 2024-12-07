import express from "express";
import { addToCart, fetchCartItems, removeCartItems, updateCartItems } from "../../controllers/shop/cartController.js";

const cartRouter = express.Router();

cartRouter.post('/add', addToCart)
cartRouter.get('/get/:userId', fetchCartItems)
cartRouter.put('/update', updateCartItems)
cartRouter.delete('/remove/:userId/:productId', removeCartItems)

export default cartRouter