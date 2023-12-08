import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import Error from '../components/Error';
import Spinner from '../utils/Rolling-1s-200px.svg';
import axios from '../config/axios';

function Login() {
    const [data, setData] = useState({ email: '', password: '' });
    const [isErr, setIsErr] = useState({ email: false, password: false });
    const [buttonClass, setButtonClass] = useState("bg-green-900");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function validateEmailAndUsername() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9]{3,}$/;

        if (usernameRegex.test(data.email) || emailRegex.test(data.email)) {
            setIsErr(prev => ({ ...prev, email: false }));
        } else {
            setIsErr(prev => ({ ...prev, email: true }));
        }
    }

    function validatePassword() {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={};:<>|./?,-])[A-Za-z\d!@#$%^&*()_+={};:<>|./?,-]{8,13}$/;
        setIsErr(prev => ({ ...prev, password: !regex.test(data.password) }));
    }

    const handleEmailAndUsernameChange = (e) => {
        setData(prev => ({ ...prev, email: e.target.value }))
        validateEmailAndUsername();
    };

    const handlePasswordChange = (e) => {
        setData(prev => ({ ...prev, password: e.target.value }));
        validatePassword();
    };

    useEffect(() => {
        if (isErr.email || isErr.password || data.email === '' || data.password === '')
            setButtonClass('bg-green-900');
        else
            setButtonClass('bg-green-500');
    }, [data, isErr, setButtonClass])


    const showPassword = () => {
        const eye = document.getElementById('eye');
        const passwordInput = document.getElementById('password');

        if (eye.classList.contains('fa-eye-slash')) {
            eye.classList.replace('fa-eye-slash', 'fa-eye');
            passwordInput.type = 'text';
        } else {
            eye.classList.replace('fa-eye', 'fa-eye-slash');
            passwordInput.type = 'password';
        }
    };

    const handleToggle = () => {
        const toggle = document.getElementById('toggle');

        if (toggle.classList.contains('fa-toggle-on')) {
            toggle.classList.replace('fa-toggle-on', 'fa-toggle-off');
        } else {
            toggle.classList.replace('fa-toggle-off', 'fa-toggle-on');
        }
    };

    const handleLogin = async () => {
        if (isErr.email || isErr.password)
            return;

        try {
            setIsLoading(true);
            const response = await axios.post('/auth/login', data);
            sessionStorage.setItem("token", response.data.token);
            navigate('/')

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }




    return (
        <div>
            <div className='w-full bg-black py-10 pl-10 md:py-7'>
                <Icon icon="logos:spotify" width="140" />
            </div>
            <div className='w-full h-full pb-9 px-10 flex flex-col items-center bg-black md:bg-gradient-to-t from-black to-zinc-800'>
                <div className='w-full bg-black md:w-[750px] md:rounded-md md:mt-9 flex flex-col md:items-center md:justify-center'>
                    <h2 className='text-white text-3xl md:text-5xl md:pt-24 font-bold'>Log in to Spotify</h2>
                    <div className='w-full py-10 border-b border-gray-800 md:w-1/2'>
                        <div className='flex flex-col gap-4'>
                            <a href='/' className='flex flex-row items-center gap-6 py-3 px-8 rounded-3xl border border-gray-500 border-solid cursor-pointer'>
                                <Icon icon="devicon:google" width='20' />
                                <div className='w-full flex justify-center'>
                                    <h4 className='text-white'>Continue with Google</h4>
                                </div>
                            </a>
                            <a href='/' className='flex flex-row items-center gap-6 py-3 px-8 rounded-3xl border border-gray-500 border-solid cursor-pointer'>
                                <Icon icon="logos:facebook" width='20' />
                                <div className='w-full flex justify-center'>
                                    <h4 className='text-white'>Continue with Facebook</h4>
                                </div>
                            </a>
                            <a href='/' className='flex flex-row items-center gap-6 py-3 px-8 rounded-3xl border border-gray-500 border-solid cursor-pointer'>
                                <Icon icon="logos:apple" width="20" fill='#ffffff' />
                                <div className='w-full flex justify-center'>
                                    <h4 className='text-white'>Continue with Apple</h4>
                                </div>
                            </a>
                            <a href='/' className='flex flex-row items-center gap-6 py-3 px-8 rounded-3xl border border-gray-500 border-solid cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" fill='#ffffff' height="16" viewBox="0 0 16 16"><g><path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" /><path d="M8 14a1 1 0 1 0 0-2a1 1 0 0 0 0 2z" /></g></svg>
                                <div className='w-full flex justify-center'>
                                    <h4 className='text-white'>Continue with phone number</h4>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className='w-full flex flex-col py-9 md:w-1/2'>
                        <div className='flex flex-col mb-3'>
                            <label htmlFor="email&username" className='text-white mb-2'>Email or username</label>
                            <input
                                type="text"
                                name="email"
                                id="email&username"
                                value={data.email}
                                onChange={handleEmailAndUsernameChange}
                                placeholder='Email or username'
                                className={`py-3 pl-3 rounded-md bg-[#121212] text-white border outline-none ${isErr.email ? "border-red-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-red-500" : "border-zink-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-white"}`}
                            />
                            {isErr.email ? <Error err="Please enter your Spotify username or email address" /> : ""}
                        </div>
                        <div className='flex flex-col mb-3'>
                            <label htmlFor="password" className='text-white mb-2'>Password</label>
                            <div className='flex flex-row relative items-center'>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={data.password}
                                    onChange={handlePasswordChange}
                                    placeholder='Password'
                                    className={`py-3 pl-3 rounded-md bg-[#121212] text-white w-full border outline-none ${isErr.password ? "border-red-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-red-500" : "border-zink-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-white"}`}
                                />
                                <i className="fa-regular fa-eye-slash text-white absolute right-3 text-xl" id='eye' onClick={showPassword}></i>
                            </div>
                            {isErr.password ? <Error err="Please enter your password" /> : ""}
                        </div>
                        <span className='w-max flex flex-row items-center gap-3 text-white' onClick={handleToggle}>
                            <i className="fa-solid fa-toggle-on text-green-500 text-3xl" id='toggle' ></i>
                            <span>Remember me</span>
                        </span>
                    </div>
                    <div className='flex flex-row gap-3 items-center w-full md:w-1/2 text-black font-bold cursor-pointer' onClick={handleLogin}>
                        <span className={`w-full py-3 flex items-center justify-center rounded-3xl ${buttonClass}`}>
                            <span>Log In</span>
                        </span>
                        {isLoading ? <img src={Spinner} alt="loader" className="w-10" /> : null}
                    </div>

                    <div className='flex flex-col items-center justify-center py-9 font-medium text-white'>
                        <Link to="/password-reset" className='underline pb-5 w-full text-center md:border-b border-gray-400'>Forget your password?</Link>

                        <div className='flex flex-col items-center md:pt-5 md:flex-row md:items-center md:gap-1'>
                            <span className='text-zinc-400'>Don't have an account?</span>
                            <Link to="/signup" className='underline pt-1 md:pt-0'>Signup for Spotify</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login