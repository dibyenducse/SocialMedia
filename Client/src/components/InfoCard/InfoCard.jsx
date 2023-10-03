import React, { useEffect, useState } from 'react';
import './InfoCard.css';
import { UilPen } from '@iconscout/react-unicons';
import ProfileModal from '../ProfileModel/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserAPi from '../../api/UserRequest';
import { logOut } from '../../actions/AuthAction';

const InfoCard = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [modalOpened, setModalOpened] = useState(false);
    const profileUserId = params.id;
    const [profileUser, setProfileUser] = useState({});
    const { user } = useSelector((state) => state.authReducer.authData);

    const handleLogOut = () => {
        dispatch(logOut());
    };

    useEffect(() => {
        const fetchProfileUser = async () => {
            if (profileUserId === user._id) {
                setProfileUser(user);
                console.log(profileUser);
            } else {
                const profileUser = await UserAPi.getUser(profileUserId);
                setProfileUser(profileUser);
                console.log(profileUser);
            }
        };
        fetchProfileUser();
    }, [user]);

    return (
        <div className="InfoCard">
            <div className="infoHead">
                <h4>Profile Info</h4>
                {user._id === profileUserId ? (
                    <div>
                        <UilPen
                            width="2rem"
                            height="1.2rem"
                            onClick={() => setModalOpened(true)}
                        />
                        <ProfileModal
                            modalOpened={modalOpened}
                            setModalOpened={setModalOpened}
                            data={user}
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
            <div className="info">
                <span>
                    <b>Status </b>
                    <span>{profileUser.relationship}</span>
                </span>
            </div>
            <div className="info">
                <span>
                    <b>Lives In </b>
                </span>
                <span>{profileUser.livesIn}</span>
            </div>
            <div className="info">
                <span>
                    <b>Works at </b>
                </span>
                <span>{profileUser.worksAt}</span>
            </div>
            <button className="button logout-button" onClick={handleLogOut}>
                Logout
            </button>
        </div>
    );
};

export default InfoCard;
