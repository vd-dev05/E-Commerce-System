// server/services/countdownService.js

let timeLeft = 70; // Initialize countdown time

let cache = {
  timeStart  : 1 ,
  timeEnd : 12,
  timeLeft: timeLeft,
  interval: null,
};

const startCountdown = (socket) => {
  // Send the initial countdown time when a new connection is made
  socket.emit('countdown', cache.timeLeft);
  if (cache.interval) { clearInterval(cache.interval); }
  if (cache.timeStart) { clearInterval(cache.timeStart); }

  cache.interval = setInterval(() => {
    cache.timeLeft -= 1;
    // cache.timeStart += 1;
    if (cache.timeLeft <= 0 ) {
      cache.timeLeft = timeLeft;
      if (cache.timeStart === cache.timeEnd) {
        cache.timeStart = 1;
      }
      cache.timeStart += 1;
    } 


    socket.emit('countdown', {
      timeLeft: cache.timeLeft,
      timeStart: cache.timeStart,
      
    });
  } , 1000);

};


export default { startCountdown  };
