import express from "express";
import { upload } from "../../config/cloudinary.js"
import { createProduct, deleteProduct, fetchAllProducts, handleImageUpload, updateProduct } from "../../controllers/admin/productsController.js";

const adminRouter = express.Router();

adminRouter.post('/upload-image', upload.single('my_file'), handleImageUpload)
adminRouter.post('/create', createProduct)
adminRouter.get('/list', fetchAllProducts)
adminRouter.put('/update/:id', updateProduct)
adminRouter.delete('/delete/:id', deleteProduct)


export default adminRouter