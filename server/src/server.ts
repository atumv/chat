import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { PORT, CLIENT_HOST } from './config';

const app = express();

const httpServerOptions = {
  cors: {
    origin: CLIENT_HOST,
  },
};

const httpServer = createServer(app);
const io = new Server(httpServer, httpServerOptions);

app.use(cors());

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on('send message', (data) => {
    socket.to(data.room).emit('receive message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on localhost:${PORT}`);
});
