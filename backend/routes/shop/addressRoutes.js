import express from "express";
import { addAddress, fetchAllAddress, removeAddress, updateAddress } from "../../controllers/shop/addressController.js";

const addressRouter = express.Router();

addressRouter.get('/get/:userId', fetchAllAddress)
addressRouter.post('/add', addAddress)
addressRouter.put('/update/:userId/:addressId', updateAddress)
addressRouter.delete('/remove/:userId/:addressId', removeAddress)

export default addressRouter