import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
const test = "test";
const secretKey = 'your-secret-key'; 

export const searchUser = async (req, res) => {
    const search = req.query.fullName;
    try{
        const users = await User.find({fullName: new RegExp(search, 'i')})
        .find({ _id: { $ne: req.userId } }).limit(10);
        if (users.length === 0) {
            res.json({ message: 'Không tìm thấy người dùng nào.' });
          } else {
            res.status(200).json(
                users
            )
        }
    } catch (err) {
        res.status(500).json({
          status: false,
          message: err.message,
        });
    }
}

export const getUserById = async (req, res) => {
  const id = req.params.id;
  try{
    const user = await User.findById({_id: new mongoose.Types.ObjectId(id)});
    if(!user){
      return res.status(400).json({
        status: false,
        message: 'User does not exist'
      });
    }
    res.status(200).json({
      status: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const {fullName,avatar,gender,mobile,address} = req.body;

  try{
    const user = await User.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(id)},{
      fullName,avatar,gender,mobile,address},{new: true}
    );
    if(!user){
      return res.status(400).json({
        status: false,
        message: 'User does not exist'
      });
    }
    res.status(200).json({
      status: true,
      message: 'Update user successfully',
      data: user
    });
  }catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getAllUser = async (req, res) => {
  try{
    const users = await User.find();
    res.status(200).json({
      status: true,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const follow = async (req, res) => {
  const { _id } = req.body;
  try{
    const followerUsers = await User.findById(req.userId);
    const followingUsers = await User.findById(_id);
    if(!followerUsers.followers.includes(_id)){
      await followerUsers.updateOne({$push: {followers: _id}});
      await followingUsers.updateOne({$push: {following: req.userId}});
      res.status(200).json({
        status: true,
        message: 'Follow successfully'
      });
    } else {
      res.status(400).json({
        status: false,
        message: 'You already follow this user'
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}

export const unfollow = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
  if(_id === id) return res.status(400).json({message: "You can't unfollow yourself"});
  try{
    const followerUsers = await User.findById(id);
    const followingUsers = await User.findById(_id);
    if(followerUsers.followers.includes(_id)){
      await followerUsers.updateOne({$pull: {followers: _id}});
      await followingUsers.updateOne({$pull: {following: id}});
      res.status(200).json({
        status: true,
        message: 'Unfollow successfully'
      });
    } else {
      res.status(400).json({
        status: false,
        message: 'You already unfollow this user'
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}