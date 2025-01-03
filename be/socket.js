import { Server } from "socket.io"; 
import http from "http";
import express from 'express';

const app = express();
import countdownController from './controllers/user/countdown/index.js';


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});

io.on("connect", (socket) => {    
    countdownController.handleSocketConnection(socket);
});

// port socket real time ( nhan request tu client voi thoi gian thuc)
server.listen(5001, () => {
    console.log("Socket server running on port 5001");
})
export { io, server };