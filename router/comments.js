import express from 'express';
import Comment from "../models/comments.js";
import {createComment,likeComment,deleteComment,updateComment,getAllComment,replyComment} from "../controller/comments.js";
import { authMiddleWare } from '../middleware/authentication.js';
const router = express.Router();

router.post('/createComment',authMiddleWare, createComment);
router.post('/likeComment',authMiddleWare, likeComment);
router.delete('/deleteComment/:id',authMiddleWare, deleteComment);
router.post('/updateComment',authMiddleWare, updateComment);
router.get('/getAllComment',authMiddleWare,getAllComment);
router.post('/replyComment',authMiddleWare, replyComment);

export default router;
