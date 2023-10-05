import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/userAction';

export const User = ({ person }) => {
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useSelector((state) => state.authReducer.authData);
    const dispatch = useDispatch();

    const [following, setFollowing] = useState(
        person.followers.includes(user._id)
    );
    const handleFollow = () => {
        following
            ? dispatch(unfollowUser(person._id, user))
            : dispatch(followUser(person._id, user));
        setFollowing((prev) => !prev);
    };
    return (
        <div className="follower">
            <div>
                <img
                    src={
                        publicFolder + person.profilePicture
                            ? publicFolder + person.profilePicture
                            : publicFolder + 'defaultProfile.png'
                    }
                    alt=""
                    className="followerImage"
                />
                <div className="name">
                    <span>{person.name}</span>
                    <span>{person.username}</span>
                </div>
            </div>
            <button
                className={
                    following
                        ? 'button fc-button UnfollowButton'
                        : 'button fc-button'
                }
                onClick={handleFollow}
            >
                Follow
            </button>
        </div>
    );
};