import express from 'express';
import {
    accessChat,
    addMember,
    createGroupChat,
    listChatOfUser,
    removeMember,
    reNameGroup,
    getUser,
    getChat,
    deleteGroup,
    searchAddMembers,
} from "../controller/chat.js";
import { authMiddleWare } from '../middleware/authentication.js';

const router = express.Router();
router.post("/create", authMiddleWare, createGroupChat);
router.put("/rename", authMiddleWare, reNameGroup);
router.put("/add", authMiddleWare, addMember);
router.put("/remove", authMiddleWare, removeMember);
router.delete("/delete/:id", authMiddleWare, deleteGroup);
router.get("/get!Group", authMiddleWare, searchAddMembers);
router.post("/inbox", accessChat);
router.get("/getChat/:id", authMiddleWare, getChat);
router.get("/inbox", authMiddleWare, listChatOfUser);

export default router;