import express from 'express';

import { createPost, getPost,updatePost,deletePost,likePost,getTimeline,getUserlikepost} from '../controller/post.js'
import { authMiddleWare } from '../middleware/authentication.js';

const router = express.Router();

router.post('/createPost',authMiddleWare, createPost);
router.get('/getPost', getPost);
router.post('/updatePost/:id', authMiddleWare, updatePost);
router.delete('/deletePost/:id', authMiddleWare,deletePost);
router.post('/likePost',authMiddleWare, likePost);
router.get('/getTimeline/:id',getTimeline);
router.get('/:id/Userlikepost',getUserlikepost);

export default router;