import mongoose from "mongoose";
import Comment from "../models/comments.js";
import Post from "../models/post.js";

export const createComment = async (req, res) => {
    const { content, postId } = req.body;
    const post = await Post.findById(postId);
    const newComment = new Comment({ content, usercreator: req.userId, postID: postId });
    try {
        const comment = await newComment.save();
        post.comments.push(comment._id);
        await post.save();
        const commentUser = await Comment.findById(comment._id).populate("usercreator");
        res.status(200).json({
            message: "Create comment successfully",
            data: commentUser,
            status :true
        })
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const likeComment = async (req, res) => {
    const { id } = req.body;
    try{
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found",
                status: false
            });
        }
        if(!comment.likes.includes(req.userId)){
            comment.likes.push(req.userId);
            await comment.save();
            res.status(200).json({
                message: "Like comment successfully",
                status: true
            });
        }else{
            comment.likes.filter((id) => id !== req.userId);
            await comment.save();
            res.status(200).json({
                message: "Unlike comment successfully",
                status: true
            });
        }
        
       
    }catch(error){
        res.status(409).json({ message: error.message });
    }
}

export const deleteComment = async (req,res) =>{
    const { id } = req.params;
    try{
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found",
                status: false
            });
        }
        await comment.delete();
        res.status(200).json({
            message: "Delete comment successfully",
            status: true
        });
    }catch(error){
        res.status(409).json({ message: error.message });
    }
}

export const updateComment = async (req,res) =>{
    const { id, content } = req.body;
    try{
        
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found",
                status: false
            });
        }
        if(comment.usercreator != req.userId){
            return res.status(403).json({
                message: "You can update only your comment",
                status: false
            });
        }
        comment.content = content;
        await comment.save();
        res.status(200).json({
            message: "Update comment successfully",
            status: true
        });
    }catch(error){
        res.status(409).json({ message: error.message });
    }
}

export const replyComment = async (req,res) =>{
    const { content, commentId, postId } = req.body;
    try{
        Comment.findById(commentId).then(async (comment) => {
            const newComment = new Comment({ content, usercreator: req.userId, postID: postId, commentID: commentId });
            const reply = await newComment.save();
            comment.reply.push(reply._id);
            await comment.save();
            const commentUser = await Comment.findById(reply._id).populate("usercreator");
            res.status(200).json({
                message: "Reply comment successfully",
                data: commentUser,
                status: true
            });
        }).catch((error) => {
            res.status(409).json({ message: error.message });
        });
    }catch(error){
        res.status(409).json({ message: error.message });
    }
}

export const getAllComment = async (req,res) =>{
    const { id } = req.params;
    try{
        const comments = await Comment.find({postID: id}).populate("usercreator").populate("likes");
        res.status(200).json({
            message: "Get all comment successfully",
            data: comments,
            status: true
        });
    }catch(error){
        res.status(409).json({ message: error.message });
    }
}