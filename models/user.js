import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        index: 'text',
    },
    email:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    avatar: {
        type: String,
        default:
          "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg",
    },
    gender: { type: String, default: "male" },
    mobile: { type: String, default: "" },
    address: { type: String, default: "" },
    story: {
        type: String,
        default: "",
        maxlength: 200,
    },
    website: { type: String, default: "" },
    followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    saved: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    isAppear: {
        type: Boolean,
        default: false,
    },
    isDisappear: {
        type: Boolean,
        default: false,
    },
    },
    {
      timestamps: true,
    
});
export default mongoose.model("User", userSchema);
