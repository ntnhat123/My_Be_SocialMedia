import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content : {
        type: String,
        required: true,
    },
    images: {
        type: Array,
    },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    usercreator: { type: mongoose.Types.ObjectId, ref: "User" },
},
{
    timestamps: true,
});

export default mongoose.model("Post", postSchema);