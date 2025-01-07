import express from "express";
import ManagerProductController from "../../../controllers/manager/products/productController.js";
import { managerAuthMiddleware, validateManagerInput } from "../../../middlewares/authMiddleware.js";
import { checkAuth, login, logout, register } from "../../../controllers/manager/auth/managerController.js";
import { createCategoryByManager, deleteCategoryByManager, listCategoryByManager, updateCategoryByManager } from "../../../controllers/manager/products/categoryController.js";

const manageRouter = express.Router();

manageRouter.post('/create', ManagerProductController.createProducts)

//Auth manager
manageRouter.post('/register', validateManagerInput, register)
manageRouter.post('/login', login)
manageRouter.post('/logout', logout)
manageRouter.get('/check-auth', managerAuthMiddleware, checkAuth)

//Category manager
manageRouter.post('/category/create', createCategoryByManager)
manageRouter.delete('/category/delete', deleteCategoryByManager)
manageRouter.put('/category/update', updateCategoryByManager)
manageRouter.get('/category/list/:managerId', listCategoryByManager)

export default manageRouter