// Import io từ index.js
// import { io } from './index.js';
import countdownController from './controllers/user/countdown/index.js';
import { Server } from "socket.io"; 
import { app } from './index.js';
import { server } from './index.js';
// const io = new Server(app, {
//     cors: {
//         origin: "*",
//     },
// });


// Xử lý kết nối của Socket.IO
io.on("connection", (socket) => {  
    countdownController.handleSocketConnection(socket);  // Ví dụ: xử lý sự kiện khi client kết nối
});

// Tạo một namespace mới cho chat
const chatNamespace = io.of("chat-connect");

chatNamespace.on("connection", (socket) => {
    console.log("A user connected to chat namespace!");

    socket.on("chat", (msg) => {
        socket.join(msg.room);  // Client tham gia phòng chat
        chatNamespace.to(msg.room).emit("chat", msg);  // Phát sống tin nhắn cho tất cả client trong phòng
    });
});

server.listen(5001, () => {
    console.log(`Socket.IO server running on port: 5001`);
}); 