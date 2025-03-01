import express from "express";
import { upload } from "../../../config/cloudinary.js";
import { createProduct, deleteProduct, fetchProductByDetails, fetchProductsByManager, updateProduct, uploadProductImages } from "../../../controllers/manager/products/productController.js";
import { managerAuthMiddleware, validateManagerInput } from "../../../middlewares/authMiddleware.js";
import { checkAuth, login, logout, register } from "../../../controllers/manager/auth/managerController.js";
import { createCategoryByManager, deleteCategoryByManager, listCategoryByManager, updateCategoryByManager } from "../../../controllers/manager/products/categoryController.js";
import { createVoucher } from "../../../controllers/manager/products/voucherController.js";
import ChatManagerController from "../../../controllers/manager/chat/index.js";

const manageRouter = express.Router();

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

//Product manager

manageRouter.post('/product/upload-images',
    upload.fields([
        { name: "mainImage", maxCount: 1 },
        { name: "additionalImages", maxCount: 10 },
    ]),
    uploadProductImages)

manageRouter.post("/products/create", createProduct);
manageRouter.put("/products/update/:managerId/:productId", updateProduct);
manageRouter.delete("/products/delete/:managerId/:productId", deleteProduct);
manageRouter.get("/products/list/:managerId", fetchProductsByManager);
manageRouter.get("/products/list-details/:managerId/:productId", fetchProductByDetails);

// Voucher manager
manageRouter.post('/voucher/create', createVoucher)

// Message manager 
manageRouter.get('/message/:id',managerAuthMiddleware,ChatManagerController.getMessageRoomAll)
manageRouter.get('/room/all',managerAuthMiddleware,ChatManagerController.getRoomMessageAll)
manageRouter.post('/send/:id', managerAuthMiddleware, ChatManagerController.sendUser )

export default manageRouter