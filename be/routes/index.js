import express from "express";
import userRouter from './ver1/auth/authRoutes.js'
import adminRouter from './ver1/admin/adminRoutes.js'
import shopRouter from './ver1/shop/shopRoutes.js'
import cartRouter from './ver1/shop/cartRoutes.js'
import addressRouter from './ver1/shop/addressRoutes.js'
import orderRouter from './ver1/shop/orderRoutes.js'
// import adminOrderRouter from './ver1/admin/orderRoutes.js'
import searchRouter from './ver1/shop/searchRoutes.js'
import commentRouter from './ver1/shop/commentRoutes.js'


const RootRouter = express.Router();
// endpoints : http://{url}/api/v1 
RootRouter.use('/api/v1/auth',userRouter )
RootRouter.use('/api/v1/admin/products', adminRouter)
// RootRouter.use('/api/v1/admin/orders', adminOrderRouter)
RootRouter.use('/api/v1/shop/products', shopRouter)
RootRouter.use('/api/v1/shop/cart', cartRouter)
RootRouter.use('/api/v1/shop/address', addressRouter)
RootRouter.use('/api/v1/shop/order', orderRouter)
RootRouter.use('/api/v1/shop/search', searchRouter)
RootRouter.use('/api/v1/shop/comment', commentRouter)


export default RootRouter