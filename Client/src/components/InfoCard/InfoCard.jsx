import React, { useEffect, useState } from 'react';
import './InfoCard.css';
import { UilPen } from '@iconscout/react-unicons';
import ProfileModal from '../ProfileModel/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false);

    const dispatch = useDispatch();
    const params = useParams();

    const profileUserId = params.id;
    const [profileUser, setProfileUser] = useState({});

    const { user } = useSelector((state) => state.authReducer.authData);

    useEffect(() => {});

    return (
        <div className="InfoCard">
            <div className="infoHead">
                <h4>Your Info</h4>
                <div>
                    <UilPen
                        width="2rem"
                        height="1.2rem"
                        onClick={() => setModalOpened(true)}
                    />
                    <ProfileModal
                        modalOpened={modalOpened}
                        setModalOpened={setModalOpened}
                    />
                </div>
            </div>
            <div className="info">
                <span>
                    <b>Status </b>
                    <span>In Relationship</span>
                </span>
            </div>
            <div className="info">
                <span>
                    <b>Lives In </b>
                </span>
                <span>Dhaka</span>
            </div>
            <div className="info">
                <span>
                    <b>Works at </b>
                </span>
                <span>Bloombrain</span>
            </div>
            <button className="button logout-button">Logout</button>
        </div>
    );
};

export default InfoCard;
