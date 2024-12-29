//packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import RootRouter from './routes/index.js';
//Utiles
import connectDB from './config/mongodb.js';


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
app.use(RootRouter)
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})