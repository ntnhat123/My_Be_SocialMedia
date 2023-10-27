import express from 'express';
import {searchUser,getUserById,getAllUser,updateUser,follow,unfollow} from '../controller/user.js';
import { authMiddleWare } from '../middleware/authentication.js';
const router = express.Router();

router.post('/searchUser',authMiddleWare, searchUser);
router.get('/user/:id', authMiddleWare,getUserById);
router.post('/updateUser/:id', updateUser);
router.get('/getAllUser', getAllUser);
router.post('/follow', authMiddleWare,follow);
router.post('/unfollow', authMiddleWare, unfollow);


export default router;