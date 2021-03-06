import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { v4 } from 'uuid';

const app = express();
const io = new Server(new http.Server(app));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect(`/${v4()}`);
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

app.listen(3000, () => {
  console.log('server running on port 3000');
});
