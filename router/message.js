import express from 'express';
import { authMiddleWare } from '../middleware/authentication.js';
import { sendMessage , getMessageOfUser} from '../controller/message.js';

const router = express.Router();

router.post('/sendMessage',authMiddleWare, sendMessage);
router.get('/getMessageOfUser/:id',authMiddleWare, getMessageOfUser);

export default router;