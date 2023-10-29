import express from 'express';

import { createPost, getPost,updatePost,deletePost,likePost,getTimeline,getUserlikepost,getPostOfUserId,getLikePost} from '../controller/post.js'
import { authMiddleWare } from '../middleware/authentication.js';

const router = express.Router();

router.post('/createPost',authMiddleWare, createPost);
router.get('/getPost', getPost);
router.get('/getPostOfUserId/:id',authMiddleWare ,getPostOfUserId);
router.post('/updatePost/:id', authMiddleWare, updatePost);
router.post('/deletePost', authMiddleWare,deletePost);
router.post('/likePost',authMiddleWare, likePost);
router.get('/getLikePost', authMiddleWare, getLikePost);
router.get('/getTimeline/:id',getTimeline);
router.get('/:id/Userlikepost',getUserlikepost);

export default router;