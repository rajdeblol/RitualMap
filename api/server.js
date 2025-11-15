const { Server } = require('socket.io');
const { createServer } = require('http');

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

let summonings = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.emit('load', summonings);

  socket.on('join', (data) => {
    data.id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    data.timestamp = Date.now();
    summonings.push(data);
    io.emit('new', data);
    console.log('New ritual:', data.name);
  });

  socket.on('disconnect', () => console.log('User disconnected'));
});

module.exports = httpServer;
