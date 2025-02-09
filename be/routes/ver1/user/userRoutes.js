import express from "express";
import CountDown from "../../../controllers/user/countdown/index.js";
import OrderController from "../../../controllers/user/card/orderControllers.js";
import { authMiddleware } from "../../../middlewares/authMiddleware.js";
import { uploadUser } from "../../../config/cloundAvartar.js";
import AvartarController from "../../../controllers/user/edit/avartar.js";
import  PayPalServices from '../../../services/paypal.js'
import EditProfile from "../../../controllers/user/edit/profile.js";
import { ChangePassword, EditPassword } from "../../../controllers/user/edit/password.js";
import TransitionsController from "../../../controllers/user/transition/index.js";
import AddressProfile from "../../../controllers/user/address/index.js";
import SearchController, { getSearch } from "../../../controllers/user/searchHistory/index.js";
import Products from "../../../controllers/user/products/products.js";
import CartController from "../../../controllers/user/card/cartControllers.js";
const usersRouter = express.Router();

// usersRouter.post('/countdown/start',CountDown.getTimeStart)
// usersRouter.get('/countdown/end',CountDown.getTimeCountdownEndTime)

usersRouter.post('/products/create-order', authMiddleware ,OrderController.addOrder)
usersRouter.get('/products/get-order', authMiddleware ,OrderController.getOrder)
usersRouter.post('/file-upload',authMiddleware,uploadUser.single('avatar'),AvartarController)
usersRouter.post('/order/coin/paypal' ,authMiddleware, PayPalServices.createCoinUser)
usersRouter.get('/getcoin-paypal' ,authMiddleware, PayPalServices.getCoinUser)
usersRouter.put('/edit-profile', authMiddleware, EditProfile)
usersRouter.post('/check-password', authMiddleware,ChangePassword )
usersRouter.put('/edit-password', authMiddleware,EditPassword)
usersRouter.get('/get-coin-transaction', authMiddleware,TransitionsController.getTransition)
usersRouter.post('/address', authMiddleware,AddressProfile.createAddress)
usersRouter.get('/address_all', authMiddleware,AddressProfile.getAddress)
usersRouter.put('/address/:id', authMiddleware,AddressProfile.updateAddress)
usersRouter.post('/search/create', authMiddleware,SearchController)
usersRouter.get('/search', authMiddleware,getSearch)
usersRouter.get('/get-voucher' , authMiddleware, )
usersRouter.get('/products', authMiddleware,Products.getAllProducts)
usersRouter.post('/products',Products.getQueryProducts)
usersRouter.get('/products/:id', Products.getProductById)
usersRouter.post('/rating', authMiddleware,CartController.createRatingController)
usersRouter.post('/cart/add', authMiddleware ,CartController.addCart)
usersRouter.get('/cart', authMiddleware, CartController.getToCart)
usersRouter.get('/cart/3',authMiddleware ,CartController.getToCartThree)  
usersRouter.post('/cart/1',authMiddleware ,CartController.removeToCart)  
usersRouter.delete('/cart/all',authMiddleware ,CartController.removeAllCart)
usersRouter.post('/', (req,res) => { console.log("tets");
} )


export default usersRouter