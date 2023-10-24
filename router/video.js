import express from 'express';
import { authMiddleWare } from '../middleware/authentication.js';
import { uploadVideo, getVideo, getVideoById, deleteVideo, updateVideo, getVideoByUserId } from '../controller/video.js';

const router = express.Router();

router.post('/uploadVideo',authMiddleWare, uploadVideo);
router.get('/getVideo', getVideo);
router.get('/getVideoById/:id', getVideoById);
router.delete('/deleteVideo/:id', authMiddleWare, deleteVideo);
router.post('/updateVideo/:id', authMiddleWare, updateVideo);
router.get('/getVideoByUserId/:id', getVideoByUserId);

export default router;
