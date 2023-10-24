import express from 'express';
import { authMiddleWare } from '../middleware/authentication.js';
import { uploadStory, getStory, getStoryById, deleteStory, updateStory, getStoryByUserId } from '../controller/story.js';

const router = express.Router();

router.post('/uploadStory',authMiddleWare, uploadStory);
router.get('/getStory', getStory);
router.get('/getStoryById/:id', getStoryById);
router.delete('/deleteStory/:id', authMiddleWare, deleteStory);
router.post('/updateStory/:id', authMiddleWare, updateStory);
router.get('/getStoryByUserId/:id', getStoryByUserId);

export default router;