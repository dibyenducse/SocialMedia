import React from 'react';

export const User = ({ person }) => {
    return (
        <div className="follower">
            <div>
                <img src={person.img} alt="" className="followerImage" />
                <div className="name">
                    <span>{person.name}</span>
                    <span>@{person.usernamer}</span>
                </div>
            </div>
            <button className="button fc-button">Follow</button>
        </div>
    );
};
