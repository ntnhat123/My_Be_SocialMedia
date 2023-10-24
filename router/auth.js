import express from 'express';
import {
    register,login,loginbyGoogle,loginToken, logout
} from '../controller/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/loginbyGoogle', loginbyGoogle);
router.post('/loginToken', loginToken);
router.get('/logout', logout);

export default router;
