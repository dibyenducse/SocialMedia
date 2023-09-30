import React from 'react';
import './ProfileCard.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileCard = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const ProfilePage = false;
    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img
                    src={
                        user.coverPicture
                            ? serverPublic + user.coverPicture
                            : serverPublic + 'defaultCover.jpg'
                    }
                    alt=""
                ></img>
                <img
                    src={
                        user.profilePicture
                            ? serverPublic + user.profilePicture
                            : serverPublic + 'defaultProfile.png'
                    }
                    alt=""
                ></img>
            </div>
            <div className="ProfileName">
                <span>
                    {user.firstname}
                    {user.lastname}
                </span>
                <span>{user.workAt ? user.workAt : 'Write your bio'}</span>
            </div>
            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>{user.followings.length}</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{user.followers.length}</span>
                        <span>Followers</span>
                    </div>
                    {ProfilePage && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>3</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            {ProfilePage ? (
                ''
            ) : (
                <span>
                    <Link
                        to={`/profile/${user._id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        My Profile
                    </Link>
                </span>
            )}
        </div>
    );
};

export default ProfileCard;
