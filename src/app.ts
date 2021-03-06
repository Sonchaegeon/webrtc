import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
const app = express();
const io = new Server(new http.Server(app));

app.listen(3000, () => {
  console.log('server running on port 3000');
});
