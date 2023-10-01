import React from 'react';
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft';
import './Profile.css';
import PostSide from '../../components/PostSide/PostSide';
import ProfileCard from '../../components/ProfileCard.jsx/ProfileCard';
import RightSide from '../../components/RightSide/RightSide';

const Profile = () => {
    return (
        <div className="Profile">
            <ProfileLeft />

            <div className="Profile-center">
                <ProfileCard location="profilePage" />
                <PostSide />
            </div>

            <RightSide />
        </div>
    );
};

export default Profile;
