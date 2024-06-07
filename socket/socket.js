import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);
const socket = () => {
    const io = new Server(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });
    
    io.on('connection', (socket) => {
      socket.on("online", (userId) => {
        if (users.find((user) => user.userId === userId)) {
          users = users.map((user) =>
            user.userId === userId ? { userId, socketId: socket.id } : user
          );
        } else {
          users.push({
            userId: userId,
            socketId: socket.id,
          });
        }
        io.emit(
          "getUsers",
          users.map((user) => user.userId)
        );
      });
      
      console.log(`User ${socket.id} connected`);
      socket.on('login', (userInfo) => {
        io.emit('userLoggedIn', userInfo);
      });
  
      socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
        io.emit('userLoggedOut', { userId: socket.id });
      });
      socket.on("accessChat", (chat) => {
        socket.broadcast.emit("accessChat", chat);
      });

      socket.on("createPost", (post) => {
        io.emit("getPost", post);
      });

      socket.on("likePost", (post) => {
        socket.broadcast.emit("likePost", post);
      });

      //message
      socket.on("join", (idChat) => {
        console.log("idChat", idChat);
        socket.join(idChat);
      });
      socket.on('sendMessage', ({data,idChat}) => {
        socket.broadcast.emit('notify', data);
        socket.to(idChat).emit('message', data);
      });

      //group
      socket.on("reNameGroup", (data) => {
        io.in(data.chatId).emit("reNameGroup", data.chatName);
      });
      socket.on("leaveRoom", (data) => {
        console.log("data", data);
        socket.leave(data.chatId);
        socket.to(data.chatId).emit("leaveRoom", data.nameUser);
      });
      //typing
      socket.on("typing-start", (idChat) => {
        socket.to(idChat).emit("typing-start-server");
      });

      socket.on("typing-end", (idChat) => {
        socket.to(idChat).emit("typing-end-server");
      });
    });

    httpServer.listen(10001, () => {
        console.log('Socket server listening on *:10001');
    });
};
  
export default socket;