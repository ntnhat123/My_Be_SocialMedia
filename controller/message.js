import Message from "../models/message.js";
import User from "../models/user.js";

export const sendMessage = async (req, res) => {
    const { idChat, content , nameUser, image } = req.body;
    try{
        const newMessage = new Message({ chats:idChat,users:req.userId,content,nameUser,image });
        const message = await newMessage.save();
        Message.findOne({ _id: message._id }).populate("users");
        res.status(200).json({
            message: "Send message successfully",
            data: message,
            status :true
        })
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}

export const getMessageOfUser = async (req, res) => {
    const { id } = req.params;
    try{
        const messages = await Message.find({ chats: id }).populate({
            path: 'users',
            model: User
        });
        res.status(200).json({
            message: "Get message successfully",
            data: messages,
            status :true
        })
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}

