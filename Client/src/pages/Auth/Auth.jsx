import React, { useState } from 'react';
import './Auth.css';
import Logo from '../../img/logo.png';
import { useDispatch } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction';
// import { Cursor } from 'mongoose';

const Auth = () => {
    const [isSignup, setIsSignUp] = useState(true);
    const dispatch = useDispatch();

    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        password: '',
        confirmpassword: '',
        username: '',
    });

    const [confirmPass, setConfirmPass] = useState(true);

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };
    //handle change in input
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            data.password === data.confirmpasswod
                ? dispatch(signUp(data))
                : setConfirmPass(false);
        } else {
            dispatch(logIn(data));
        }
    };
    //reset form
    const resetForm = () => {
        setConfirmPass(true);
        setData({
            firstname: '',
            lastname: '',
            password: '',
            confirmpassword: '',
            username: '',
        });
    };

    return (
        <div className="Auth">
            {/* Left Side */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>Bloomyou</h1>
                    <h6>A Social Share Platform</h6>
                </div>
            </div>
            {/* Right Side */}
            <div className="a-right">
                <form className="infoForm authForm" onSubmit={handleSubmit}>
                    <h3>{isSignup ? 'Sign up' : 'Login'}</h3>

                    {isSignup && (
                        <div>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="infoInput"
                                name="firstname"
                                onChange={handleChange}
                                value={data.firstname}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="infoInput"
                                name="lastname"
                                onChange={handleChange}
                                value={data.lastname}
                            />
                        </div>
                    )}

                    <div>
                        <input
                            type="text"
                            className="infoInput"
                            name="username"
                            placeholder="Usernames"
                            onChange={handleChange}
                            value={data.username}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            className="infoInput"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={data.password}
                        />
                        {isSignup && (
                            <input
                                type="text"
                                className="infoInput"
                                name="confirmpassword"
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                value={data.confirmpasspword}
                            />
                        )}
                    </div>
                    <span
                        style={{
                            display: confirmPass ? 'none' : 'block',
                            color: 'red',
                            fontSize: '12px',
                            alignContent: 'flex-end',
                            marginRight: '5px',
                        }}
                    >
                        * Confirm Password is not same
                    </span>

                    <div>
                        <span
                            style={{ fontSize: '12px', cursor: 'pointer' }}
                            onClick={() => {
                                setIsSignUp((prev) => !prev);
                                resetForm();
                            }}
                        >
                            {isSignup
                                ? 'Already have an account. Login!'
                                : "Don't have an account. Signup!"}
                        </span>
                    </div>
                    <button className="button infoButton" type="submit">
                        {isSignup ? 'Signup' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
