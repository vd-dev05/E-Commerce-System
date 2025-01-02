// server/services/countdownService.js

let timeLeft = 3600; // Khởi tạo thời gian đếm ngược (1 giờ = 3600 giây)

const startCountdown = (socket) => {
  // Gửi thời gian đếm ngược khi có kết nối mới
  socket.emit('countdown', timeLeft);

  // Cập nhật thời gian mỗi giây và gửi tới tất cả các client
  const interval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }
    timeLeft--;
    socket.emit('countdown', timeLeft);
  }, 1000);

  // Xử lý khi client ngắt kết nối
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
};

export default { startCountdown };
