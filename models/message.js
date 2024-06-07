import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chats : { type: mongoose.Types.ObjectId, ref: "Chat" } ,
    users : { type: mongoose.Types.ObjectId, ref: "User" } ,
    content : { type: String } ,
    nameUser : { type: String } ,
    image : { type: String } ,
});

export default mongoose.model("Message", messageSchema);