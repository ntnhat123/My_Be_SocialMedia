import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    fileName:String,
    path: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model("Video", videoSchema);