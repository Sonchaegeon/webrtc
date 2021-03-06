import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { v4 } from 'uuid';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views/public'));

app.get('/', (req, res) => {
  res.redirect(`/${v4()}`);
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

io.on('connection', (socket: Socket) => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId);
    });
  });
});

server.listen(3000, () => {
  console.log('server running on port 3000');
});
