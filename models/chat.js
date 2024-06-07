import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chatName: { type: String, trim: true },
    isAppear: { type: Boolean, default: false },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    image: { type: String },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

export default mongoose.model("Chat", chatSchema);