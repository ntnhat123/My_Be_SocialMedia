import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content : {
        type: String,
    },
    likes: [
        {
            userId: { type: mongoose.Types.ObjectId, ref: "User" },
            createdAt: Date,
        },
    ],
    comment: [
        {
            userId: { type: mongoose.Types.ObjectId, ref: "Comment" },
            text: String,
            createdAt: Date,
        },
    ],
    usercreator: { type: mongoose.Types.ObjectId, ref: "User" },
    tag:{Object},
    postID:{ type: mongoose.Types.ObjectId, ref: "Post" },
    commentID:{ type: mongoose.Types.ObjectId, ref: "Comment" },
    postUserID:{ type: mongoose.Types.ObjectId, ref: "User" },
},
{
    timestamps: true,
});

export default mongoose.model("Comment", commentSchema);