//packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
//Utiles
import connectDB from './config/mongodb.js';
import userRouter from './routes/auth/authRoutes.js';
import adminRouter from './routes/admin/adminRoutes.js';
import shopRouter from './routes/shop/shopRoutes.js';
import cartRouter from './routes/shop/cartRoutes.js';
import addressRouter from './routes/shop/addressRoutes.js';
import orderRouter from './routes/shop/orderRoutes.js';
import adminOrderRouter from './routes/admin/orderRouter.js';


dotenv.config();
const port = process.env.PORT || 5000;

connectDB()

const app = express();

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
    ],
    credentials: true,
}))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send('API Working')
})

app.use('/api/auth', userRouter)
app.use('/api/admin/products', adminRouter)
app.use('/api/admin/orders', adminOrderRouter)
app.use('/api/shop/products', shopRouter)
app.use('/api/shop/cart', cartRouter)
app.use('/api/shop/address', addressRouter)
app.use('/api/shop/order', orderRouter)


app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})