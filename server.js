import * as dotenv from 'dotenv'
import connect from './database/database.js'
import bodyParser from "body-parser";
import express from 'express';
import mongoose from 'mongoose';
import auth from './router/auth.js';
import user from './router/user.js';
import post from './router/post.js';
import cors from 'cors';
import comments from './router/comments.js';
import video from './router/video.js';
import story from './router/story.js';
import chat from './router/chat.js';
import message from './router/message.js';
import socket from './socket/socket.js';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001;
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json())
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use('/auth', auth);
app.use('/user', user);
app.use('/post', post);
app.use('/comment', comments);
app.use("/video", video);
app.use('/story',story);
app.use('/chat', chat);
app.use('/message', message);

let users = [];
let posts = [];

io.on("connection", (socket) => {
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
    socket.on("createPost", (post) => {
        io.emit("getPost", post);
    });
    socket.on("join", (idPost) => {
        socket.join(idPost);
    });

    socket.on("likePost", (post) => {
        socket.broadcast.emit("likePost", post);
    });
});

app.use("/",(req , res) => {
    res.send("Hello World");
})  

httpServer.listen(
    PORT, async() => {
    await connect();
    // socket();
    console.log(`Server is running on port: ${PORT}`);
});


app.use(express.json());