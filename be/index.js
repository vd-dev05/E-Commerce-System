//packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import RootRouter from './routes/index.js';



//Utiles
import connectDB from './config/mongodb.js';
import { server } from './socket.js';


const app = express();

dotenv.config();
const port = process.env.PORT || 5000;



app.use(express.json())
app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true,
    }
))
app.use(cookieParser())

// io.on('connection', countdownController.handleSocketConnection);


app.get("/", (req, res) => {
    res.send('API Working')
})
app.use(RootRouter)
// port server ( nhan request tu client)
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
    connectDB()

    // port socket real time ( nhan request tu client voi thoi gian thuc)
    server.listen(5001, () => {
        console.log("Socket server running on port 5001");
    })
})

export { app };