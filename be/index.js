//packages
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import RootRouter from './routes/index.js';
import http from 'http';
import { Server } from 'socket.io';
import countdownController from './controllers/user/countdown/index.js';

//Utiles
import connectDB from './config/mongodb.js';


dotenv.config();
const port = process.env.PORT || 5000;

connectDB()

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json())
app.use(cors(
    {
    origin : '*',
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

app.get("/", (req, res) => {    
    res.send('API Working')
})
app.use(RootRouter)
io.on('connection', countdownController.handleSocketConnection);
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})