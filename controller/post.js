import mongoose from "mongoose";
import Post from "../models/post.js";

export const createPost = async (req, res) => {
    try{
        const { content, images } = req.body;
        const newPost = new Post({ content, images, usercreator: req.userId,createAt:new Date().toISOString() });
        const post = await newPost.save();
        const postUser = await Post.findById(post._id).populate("usercreator").populate("likes");
        res.status(200).json({
            message: "Create post successfully",
            data: postUser,
            status :true
        })
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.find().populate("usercreator").populate("likes");
        res.status(200).json({
            message: "Get post successfully",
            data: post,
            status :true
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getPostOfUserId = async (req, res) => {
    try{
        const { id } = req.params;
        const post = await Post.findById(id).populate("usercreator").populate("likes");
        res.status(200).json({
            message: "Get post successfully",
            data: post,
            status :true
        })
    }catch(error){
        res.status(409).json({ message: error.message });
    }
}
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { content, images } = req.body;
    try{
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        const updatedPost = { content, images, _id: id };
        await Post.findByIdAndUpdate(id, updatedPost, { new: true });
        const postUser = await Post.findById(id).populate("usercreator", "username avatar");
        res.status(200).json({
            message: "Update post successfully",
            data: postUser,
            status :true
        })
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    try{
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        await Post.findByIdAndRemove(id);
        res.status(200).json({
            message: "Delete post successfully",
            status :true
        })
    }catch(error){
        res.status(409).json({ message: error.message });
    }
}

export const likePost = async (req, res) => {
    const { id } = req.body;
    try{
        const post = await Post.findById(id);
        if (!post.likes.includes(req.userId)) {
            await post.updateOne({ $push: { likes: req.userId } });
            res.status(200).json({
                message: "Like post successfully",
                status :true
            })
        } else {
            await post.updateOne({ $pull: { likes: req.userId } });
            res.status(200).json({
                message: "Unlike post successfully",
                status :true
            })
        }
    }catch(error){
        res.status(409).json({ message: error.message });
    }
}

export const getTimeline = async (req, res) => {
    const { id } = req.params;
    try{
        const currentUser = await Post.findById(id);
        const userPosts = await Post.find({ usercreator: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ usercreator: friendId });
            })
        );
        res.status(200).json({
            message: "Get timeline successfully",
            data: userPosts.concat(...friendPosts),
            status :true
        })
    }catch(error){
        res.status(409).json({ message: error.message });
    }
};


export const getUserlikepost = async (req, res) => {
    const { id } = req.params;
    try{
        const post = await Post.findById(id);
        const userlikepost = await Promise.all(
            post.likes.map((userId) => {
                return Post.find({ usercreator: userId });
            })
        );
        res.status(200).json({
            message: "Get user like post successfully",
            data: userlikepost,
            status :true
        })
    }catch(error){
        res.status(409).json({ message: error.message });
    }
}
