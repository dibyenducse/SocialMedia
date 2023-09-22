import PostModel from '../Models/postModel.js';
import mongoose from 'mongoose';
import UserModel from '../Models/userModel.js';
import express from 'express';

//create a new post
export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body);

    try {
        const post = await newPost.save();
        res.status(200).json('Post Created Successfully');
        console.log(post);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Get a post
export const getPost = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Update a post
export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(postId);
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json('Post Updated');
        } else {
            res.status(403).json('Action Forbidden');
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

//Delete a post

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);
        if (post.userId === userId) {
            await post.deleteOne(
                res.status(200).json('Post Deleted Successfully')
            );
        } else {
            res.status(403).json('Action Forbidden');
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

//like/dislike a post
export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json('Post Liked');
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json('Post Unliked');
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};

//Get Timeline Posts
export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;

    try {
        const cuurentUserPosts = await PostModel.find({ userId: userId });
        //make timeline posts for own user and followed user
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: 'following',
                    foreignField: 'userId',
                    as: 'followingPosts',
                },
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0,
                },
            },
        ]);

        res.status(200).json(
            cuurentUserPosts
                .concat(...followingPosts[0].followingPosts) //sort latest timeline post
                .sort((a, b) => {
                    return b.createdAt - a.createdAt;
                })
        );
    } catch (error) {
        res.status(500).json(error);
    }
};
