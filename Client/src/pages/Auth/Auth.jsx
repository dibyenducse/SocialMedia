import React, { useState } from 'react';
import './Auth.css';
import Logo from '../../img/logo.png';
import { Cursor } from 'mongoose';

const Auth = () => {
    const [isSignup, setIsSignUp] = useState(false);

    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        password: '',
        confirmpassword: '',
        username: '',
    });

    const handleChange = () => {};
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
                <form className="infoForm authForm">
                    <h3>{isSignup ? 'Sign up' : 'Login'}</h3>

                    {isSignup && (
                        <div>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="infoInput"
                                name="firstname"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="infoInput"
                                name="lastname"
                            />
                        </div>
                    )}

                    <div>
                        <input
                            type="text"
                            className="infoInput"
                            name="username"
                            placeholder="Usernames"
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            className="infoInput"
                            name="password"
                            placeholder="Password"
                        />
                        {isSignup && (
                            <input
                                type="text"
                                className="infoInput"
                                name="confirmpass"
                                placeholder="Confirm Password"
                            />
                        )}
                    </div>

                    <div>
                        <span
                            style={{ fontSize: '12px', cursor: 'pointer' }}
                            onClick={() => {
                                setIsSignUp((prev) => !prev);
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
