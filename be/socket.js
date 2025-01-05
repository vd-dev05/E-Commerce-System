import { Server } from "socket.io"; 
import http from "http";
import express from 'express';

const app = express();
import countdownController from './controllers/user/countdown/index.js';
// import ChatService from "./services/chatService.js";



const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});

io.on("connect", (socket) => {    
    countdownController.handleSocketConnection(socket);
});

const chatNamespace = io.of("chat-connect");
chatNamespace.on("connect", (socket) => {
 

    socket.on("chat", (msg) => {
        socket.join(msg.room);
        chatNamespace.to(msg.room).emit("chat", msg);
    });
});

export { io, server };