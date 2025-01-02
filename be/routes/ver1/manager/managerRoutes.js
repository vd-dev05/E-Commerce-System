import express from "express";
import ManagerProductController from "../../../controllers/manager/products/productController.js";

const manageRouter = express.Router();

manageRouter.post('/create', ManagerProductController.createProducts)
export default manageRouter