import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//get all user
export const getAllUsers = async (req, res) => {
    try {
        let users = await UserModel.find();
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc;
            return otherDetails;
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

//get a user
export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);
        if (user) {
            const { password, ...otherDetails } = user._doc;
            res.status(200).json(otherDetails);
            console.log('User data found');
        } else {
            res.status(404).json('No User Found');
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};

// update a user
export const updateUser = async (req, res) => {
    const id = req.params.id;
    // console.log("Data Received", req.body)
    const { _id, currentUserAdmin, password } = req.body;

    if (id === _id) {
        try {
            // if we also have to update password then password will be bcrypted again
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }
            // have to change this
            const user = await UserModel.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            const token = jwt.sign(
                { username: user.username, id: user._id },
                process.env.JWT_KEY,
                { expiresIn: '1h' }
            );
            console.log({ user, token });
            res.status(200).json({ user, token });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    } else {
        res.status(403).json(
            'Access Denied! You can update only your own Account.'
        );
    }
};
//Delete User

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    const { currentUserId, currentUserAdminStatus } = req.body;

    if (currentUserId === id || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json('User deleted successfully');
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('You can delete only your own profile');
    }
};

//Follow User
export const followUser = async (req, res) => {
    const id = req.params.id;

    const { currentUserId } = req.body;
    if (currentUserId === id) {
        res.status(403).json('Action Forbidden');
    } else {
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(currentUserId);

            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({
                    $push: { followings: currentUserId },
                });
                await followingUser.updateOne({ $push: { followers: id } });
                res.status(200).json('User Followed!');
            } else {
                res.status(403).json('User is already followed by you!');
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

//Unfollow User

export const unFollowUser = async (req, res) => {
    const id = req.params.id;

    const { currentUserId } = req.body;
    if (currentUserId === id) {
        res.status(403).json('Action Forbidden');
    } else {
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(currentUserId);

            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({
                    $pull: { followings: currentUserId },
                });
                await followingUser.updateOne({ $pull: { followers: id } });
                res.status(200).json('User Unfollowed!');
            } else {
                res.status(403).json('User is already unfollowed by you!');
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};
