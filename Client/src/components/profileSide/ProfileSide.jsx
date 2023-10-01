import React from 'react';
import LogoSearch from '../logoSearch/LogoSearch';
import ProfileCard from '../ProfileCard.jsx/ProfileCard';
import './ProfileSide.css';
import FollowersCard from '../FollowersCard/FollowersCard';
const ProfileSide = () => {
    return (
        <div className="ProfileSide">
            <LogoSearch />
            <ProfileCard location="homePage" />
            <FollowersCard />
        </div>
    );
};
export default ProfileSide;
