const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io_server = new Server(server);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io_server.on('connection', (socket) => {
  console.log('a user connected');
  // Register events
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io_server.emit('chat message', msg);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
