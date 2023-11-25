import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content : {
        type: String,
    },
    likes: [
        {
            userId: [{ type: mongoose.Types.ObjectId, ref: "User" }],
            createdAt: Date,
        },
    ],
    comment: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    usercreator: { type: mongoose.Types.ObjectId, ref: "User" },
    tag:{Object},
    postID:{ type: mongoose.Types.ObjectId, ref: "Post" },
    commentID:{ type: mongoose.Types.ObjectId, ref: "Comment" },
    postUserID:{ type: mongoose.Types.ObjectId, ref: "User" },
    createAt: Date,
},
{
    timestamps: true,
});

export default mongoose.model("Comment", commentSchema);