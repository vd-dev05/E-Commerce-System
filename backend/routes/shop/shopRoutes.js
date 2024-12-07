import express from "express";
import { getFilteredProducts, getProductsById } from "../../controllers/shop/productsController.js";

const shopRouter = express.Router();

shopRouter.get('/get', getFilteredProducts)
shopRouter.get('/get/:id', getProductsById)

export default shopRouter