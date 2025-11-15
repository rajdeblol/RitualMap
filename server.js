// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'ritualnet.json');

// Load or init data
let summonings = [];
if (fs.existsSync(DATA_FILE)) {
  try {
    summonings = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) { summonings = []; }
}

// Serve static files
app.use(express.static(__dirname));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Socket.IO: Real-time sync
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.emit('load', summonings);

  socket.on('join', (data) => {
    data.id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
    data.timestamp = Date.now();
    summonings.push(data);
    fs.writeFileSync(DATA_FILE, JSON.stringify(summonings, null, 2));
    io.emit('new', data); // Broadcast to ALL
  });

  socket.on('disconnect', () => console.log('User disconnected'));
});

server.listen(PORT, () => {
  console.log(`RITUALNET LIVE at http://localhost:${PORT}`);
  console.log(`Deployed URL will be shown after hosting`);
});
