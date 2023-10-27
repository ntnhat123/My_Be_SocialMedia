import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content : {
        type: String,
        required: true,
    },
    images: {
        type: Array,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    comments: [
        {
            userId: { type: mongoose.Types.ObjectId, ref: "User" },
            text: String,
            createdAt: Date,
        },
    ],
    usercreator: { type: mongoose.Types.ObjectId, ref: "User" },
},
{
    timestamps: true,
});

export default mongoose.model("Post", postSchema);