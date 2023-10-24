import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('joinRoom', (roomName) => {
        console.log(roomName);
        socket.join(roomName);
    });
    socket.on('message', (message) => {
        console.log(message);
        io.to(message.roomName).emit('message', message);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

httpServer.listen(5001, () => {
    console.log('Socket server is running on port 5001');
});

export default io;
