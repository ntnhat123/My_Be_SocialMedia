import express from 'express';
import Comment from "../models/comments.js";
import {createComment,likeComment,deleteComment,updateComment,getAllComment} from "../controller/comments.js";
import { authMiddleWare } from '../middleware/authentication.js';
const router = express.Router();

router.post('/createComment',authMiddleWare, createComment);
router.post('/likeComment',authMiddleWare, likeComment);
router.delete('/deleteComment/:id',authMiddleWare, deleteComment);
router.post('/updateComment/:id',authMiddleWare, updateComment);
router.get('/getAllComment',authMiddleWare,getAllComment);

export default router;
