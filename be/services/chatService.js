const ChatService  = (socket) => {
    socket.on('room', (data) => {
        socket.join(data);
        
        socket.emit('message', {message : "hello"})
    })
}

export default ChatService