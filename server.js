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
// import socket from './socket/socket.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json())
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use('/auth', auth);
app.use('/user', user);
app.use('/post', post);
app.use('/comment', comments);
app.use("/video", video);
app.use('/story',story);
app.listen(
    PORT, async() => {
    await connect();
    console.log(`Server is running on port: ${PORT}`);
    // socket();
});

app.use("/",(req , res) => {
    res.send("Hello World");
})  

app.use(express.json());