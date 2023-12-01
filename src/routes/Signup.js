import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react';
import { validateEmail, validatePassword } from '../utils/functions';
import Error from '../components/Error';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [clicked, setClicked] = useState(false);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    const [data, setData] = useState({
        email: '',
        password: '',
        name: '',
        year: '',
        month: 'Month',
        day: '',
        gender: '',
    })

    const [isErr, setIsErr] = useState({
        email: false,
        password: false,
        name: false,
        year: false,
        month: false,
        day: false,
        gender: false,
        dob: false
    })

    const [error, setError] = useState({
        email: '',
        password: '',
        name: '',
        year: '',
        month: '',
        day: '',
        gender: '',
        dob: ''
    })

    const next = () => {
        const pages = document.getElementsByClassName('page');
        let currentPage;
        setClicked(true);

        for (const page of pages) {
            if (page.classList.contains('flex')) {
                currentPage = page;
                break;
            }
        }

        if (currentPage.id === 'page1') {
            if (isErr.email)
                return;
            if (data.email === '') {
                setIsErr(prev => ({ ...prev, email: true }));
                return; // Stop execution if there's an empty field
            }
            currentPage.classList.replace('flex', 'hidden');
            document.getElementById('page2').classList.replace('hidden', 'flex');
        } else if (currentPage.id === 'page2') {
            if (isErr.password)
                return;
            if (data.password === '') {
                setIsErr(prev => ({ ...prev, password: true }));
                setError(prev => ({ ...prev, password: "Password should contain at least 8 characters." }))
                return; // Stop execution if there's an empty field
            }
            currentPage.classList.replace('flex', 'hidden');
            document.getElementById('page3').classList.replace('hidden', 'flex');
        } else if (currentPage.id === 'page3') {
            const fields = [
                { field: 'name', msg: "Enter a name for your profile." },
                { field: 'year', msg: "Please enter the year of your birth date using four digits (e.g., 1990)" },
                { field: 'month', msg: "Select your birth month." },
                { field: 'day', msg: "Please enter a day of your birth date by entering a number between 1 and 31." },
                { field: 'gender', msg: "Select your gender." },
            ];
            let hasEmptyField = false;
            let count = 0;

            fields.forEach(field => {
                if (data[field.field] === '' || data[field.field] === 'Month') {
                    setIsErr(prev => ({ ...prev, [field.field]: true }));
                    setError(prev => ({ ...prev, [field.field]: field.msg }))
                    hasEmptyField = true;
                    if (field.field === 'year' || field.field === 'month' || field.field === 'day')
                        count++;
                }
            });
            if (count === 3) {
                setIsErr(prev => ({ ...prev, dob: true }));
                setError(prev => ({ ...prev, dob: "Please enter your date of birth." }))
                setIsErr(prev => ({ ...prev, year: false, month: false, day: false }));
                return;

            }
            if (isErr.year || isErr.month || isErr.day)
                return;

            if (hasEmptyField) {
                return; // Stop execution if there's an empty field
            }
            currentPage.classList.replace('flex', 'hidden');
            document.getElementById('page4').classList.replace('hidden', 'flex');
        }
    };

    const back = () => {
        const page = document.getElementsByClassName('page');
        const element = Array.from(page)
        let current_page;
        element.forEach(e => {
            if (e.classList.contains('flex'))
                current_page = e.id;
        });

        setIsErr(prev => ({ ...prev, email: false, password: false, name: false, year: false, month: false, day: false, gender: false, dob: false }));

        document.getElementById(current_page).classList.replace('flex', 'hidden');
        switch (current_page) {
            case "page2":
                document.getElementById('page1').classList.replace('hidden', 'flex');
                break;
            case "page3":
                document.getElementById('page2').classList.replace('hidden', 'flex');
                break;
            case "page4":
                document.getElementById('page3').classList.replace('hidden', 'flex');
                break;
            default:
                break;
        }
    }

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

    const onChange = (e, field) => {
        let value;
        if (field === "month") {
            value = e;
            setData((prev) => ({
                ...prev,
                [field]: value
            }))
        } else {
            value = e.target.value;
            setData((prev) => ({
                ...prev,
                [field]: value
            }))
        }

        // perform validation based on the field changeed

        // Email validation
        if (field === 'email') {
            const isValid = validateEmail(value);
            setIsErr((prev) => ({
                ...prev,
                [field]: !isValid
            }))
        }

        // Password validation
        if (field === 'password') {
            const is_valid = validatePassword(value);

            if (value.length < 8) {
                setIsErr((prev) => ({ ...prev, [field]: true, }));

                setError((prev) => ({ ...prev, [field]: "Password should contain at least 8 characters.", }))

            } else if (!is_valid) {
                setIsErr((prev) => ({ ...prev, [field]: !is_valid, }));

                setError((prev) => ({ ...prev, [field]: "Your password is too weak. Set a stronger one.", }))

            } else {
                setIsErr((prev) => ({ ...prev, [field]: false, }));
            }
        }

        // Name validation
        if (field === 'name') {
            if (value.length < 1) {
                setIsErr(prev => ({ ...prev, name: true }));
                setError(prev => ({ ...prev, name: "Enter a name for your profile." }))
            } else {
                setIsErr(prev => ({ ...prev, name: false }));
                setData(prev => ({ ...prev, name: value }))
            }
        }

        // Year validation
        if (field === 'year') {
            const year = value.replace(/\D/g, '').slice(0, 4);
            const is_valid_year = /^\d{1,4}$/.test(year);

            if (isErr.dob) {
                setIsErr(prev => ({ ...prev, dob: false, month: true, day: true }));
            }

            if (isErr.year && isErr.month && isErr.day) {
                setIsErr(prev => ({ ...prev, dob: true, year: false, month: false, day: false }));
                setError(prev => ({ ...prev, dob: "Please enter your date of birth." }));
            }

            if (year === '') {
                if (data.month === 'Month' && data.day === '' && clicked) {
                    setIsErr(prev => ({ ...prev, dob: true, year: false, day: false, month: false }));
                    setError(prev => ({ ...prev, dob: "Please enter your date of birth." }));
                } else {
                    setIsErr(prev => ({ ...prev, year: true }));
                    setError(prev => ({ ...prev, year: "Please enter the year of your birth date using four digits (e.g., 1990)" }));
                }
            } else if (is_valid_year) {
                if (year > '2010') {
                    setIsErr(prev => ({ ...prev, year: true }));
                    setError(prev => ({ ...prev, year: "You're too young to create a Spotify account." }));
                } else if (year < '1900') {
                    setIsErr(prev => ({ ...prev, year: true }));
                    setError(prev => ({ ...prev, year: "Please enter a birth year from 1900 onwards." }));
                } else {
                    setIsErr(prev => ({ ...prev, year: false }));
                    setError(prev => ({ ...prev, year: "" }));
                }
                setData(prev => ({ ...prev, year: year }));
            }
        }

        // Month validation
        if (field === 'month') {
            if (isErr.dob) {
                setIsErr(prev => ({ ...prev, dob: false, year: true, day: true }));
            }
            if (data.month === 'Month') {
                setIsErr(prev => ({ ...prev, month: true }));
            }
            if (isErr.year && isErr.month && isErr.day) {
                setIsErr(prev => ({ ...prev, dob: true, year: false, month: false, day: false }));
                setError(prev => ({ ...prev, dob: "Please enter your date of birth." }));
            }
            setData(prev => ({ ...prev, month: value }));
            setIsErr(prev => ({ ...prev, month: false }));
            setIsOpen(false);
        }

        // Day validation
        if (field === 'day') {
            let day = value.replace(/\D/g, '');
            day = day.slice(0, 2);

            if (isErr.dob) {
                setIsErr(prev => ({ ...prev, dob: false, year: true, month: true }));
            }

            if (day === '') {
                if (data.year === '' && data.month === 'Month' && clicked) {
                    setIsErr(prev => ({ ...prev, dob: true, year: false, month: false, day: false }));
                    setError(prev => ({ ...prev, dob: "Please enter your date of birth." }));
                } else {
                    setIsErr(prev => ({ ...prev, day: true }));
                    setError(prev => ({ ...prev, day: "Please enter a day of your birth date by entering a number between 1 and 31." }))
                }
            } else if (day < 1 || day > 31) {
                setIsErr(prev => ({ ...prev, day: true }));
                setError(prev => ({ ...prev, day: "Please enter a day of your birth date by entering a number between 1 and 31." }))
            } else {
                setData(prev => ({ ...prev, day: day }));
                setIsErr(prev => ({ ...prev, day: false }));
            }


        }

        // Gender validation
        if (field === 'gender') {
            setData(prev => ({ ...prev, gender: value }));
            setIsErr(prev => ({ ...prev, gender: false }))
        }

    }

    const handleDropdownClick = () => {
        if (isErr.dob) {
            setIsErr(prev => ({ ...prev, dob: false, month: true }));
        }
        if (data.month === 'Month' && (isOpen || !isOpen)) {
            if (data.year === '' && data.day === '' && clicked) {
                setIsErr(prev => ({ ...prev, dob: true, year: false, day: false, month: false }));
                setError(prev => ({ ...prev, dob: "Please enter your date of birth." }));
            } else {
                setIsErr(prev => ({ ...prev, month: true }));
                setError(prev => ({ ...prev, month: "Select your birth month." }));
            }
        } else {
            setIsErr(prev => ({ ...prev, month: false }));
        }
        setIsOpen((prev) => !prev);
    };

    const signup = () => {
        navigate('/');
    }

    useEffect(() => {
        if (isErr.year && isErr.month && isErr.day) {
            setIsErr(prev => ({ ...prev, dob: true, year: false, month: false, day: false }));
            setError(prev => ({ ...prev, dob: "Please enter your date of birth." }));
        }
    }, [isErr, setIsErr, setError])


    return (
        <div className='bg-[#121212] min-w-full min-h-screen'>
            <div className='w-full py-8 pl-8 md:py-7' onClick={back}>
                <Icon icon="logos:spotify" width="110" />
            </div>
            <div className='hidden justify-center page' id='page1'>
                <div className='flex flex-col px-8 sm:max-w-[380px]'>
                    <h1 className='text-4xl font-bold text-white mb-10 md:text-5xl'>Sign up to start listening</h1>
                    <div className='w-full flex flex-col'>
                        <label htmlFor="email" className='text-white font-semibold mb-2'>Email address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => { onChange(e, "email") }}
                            placeholder='name@domain.com'
                            autoComplete='true'
                            className={`py-3 pl-3 text-white bg-inherit rounded border outline-none ${isErr.email ? "border-red-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-red-500" : "border-zink-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-white"}`}
                        />
                        {isErr.email ? <Error err="This email is invalid. Make sure it's written like example@email.com" /> : null}
                    </div>
                    <Link to="/login/phone" className='mt-2 text-green-400 font-semibold underline max-w-fit'>Use phone number instead.</Link>
                    <div className='text-center w-full py-3 bg-green-600 rounded-3xl mt-5 cursor-pointer' tabIndex={0} onClick={next}>
                        <span className='font-bold text-black'>Next</span>
                    </div>
                    <div className="mt-8 text-center relative">
                        <span className="text-gray-400 before:absolute before:left-0 before:top-1/2 before:bg-gray-500 before:h-[1px] before:w-[45%] before:block after:bg-gray-500 after:h-[1px] after:block after:w-[45%] after:absolute after:right-0 after:top-1/2">or</span>
                    </div>
                    <div className='flex flex-col gap-4 pt-8 pb-10 border-b border-gray-500'>
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
                    </div>
                    <div className='py-8'>
                        <p className='text-zinc-400'>Already have an account? <a href="/login" className='underline text-white'>Log in here</a></p>
                    </div>

                </div>
            </div>
            <div className='hidden justify-center page' id='page2'>
                <div className='flex flex-col w-full px-8 xsm:w-[550px]'>
                    <div className='w-full flex justify-start bg-zinc-400'>
                        <div className="w-[33%] h-[2.75px] bg-green-500" ></div>
                    </div>
                    <div className='xsm:px-9'>
                        <div className="flex flex-row items-center mt-4">
                            <span className="material-symbols-outlined text-zinc-400 cursor-pointer" onClick={back}>
                                arrow_back_ios
                            </span>
                            <div className="flex flex-col gap-1 text-white">
                                <span className='text-zinc-400'>Step 1 of 3</span>
                                <span>Create a password</span>
                            </div>
                        </div>

                        <div className='mt-8'>
                            <label htmlFor="password" className='text-white'>Password</label>
                            <div className='flex flex-row relative items-center mt-2'>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={data.password}
                                    onChange={(e) => { onChange(e, "password") }}
                                    placeholder='Password'
                                    autoComplete='new-password'
                                    className={`py-3 pl-3 rounded-md bg-[#121212] text-white w-full border outline-none ${isErr.password ? "border-red-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-red-500" : "border-zink-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-white"}`}
                                />
                                <i className="fa-regular fa-eye-slash text-white absolute right-3 text-xl" id='eye' onClick={showPassword}></i>
                            </div>
                            {isErr.password ? <Error err={error.password} /> : null}
                            <p className="text-zinc-400 text-sm text-left mt-2">The password must contain at least 8 characters. We recommend including at least 1 number and 1 special character.</p>
                        </div>
                        <div className='mt-36 md:mt-16'>
                            <div className='text-center w-full py-3 bg-green-600 rounded-3xl mt-5 cursor-pointer' onClick={next}>
                                <span className='font-bold text-black'>Next</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center page' id='page3'>
                <div className='flex flex-col w-full px-8 xsm:w-[550px]'>
                    <div className='w-full flex justify-start bg-zinc-400'>
                        <div className="w-[66%] h-[2.75px] bg-green-500" ></div>
                    </div>
                    <div className='xsm:px-9'>
                        <div className="flex flex-row items-center mt-4">
                            <span className="material-symbols-outlined text-zinc-400 cursor-pointer" onClick={back}>
                                arrow_back_ios
                            </span>
                            <div className="flex flex-col gap-1 text-white">
                                <span className='text-zinc-400'>Step 2 of 3</span>
                                <span>Tell us about yourself</span>
                            </div>
                        </div>

                        <div className='mt-8'>
                            <div className='flex flex-col mb-5'>
                                <label htmlFor="name" className='text-white font-medium'>Name</label>
                                <span className='text-zinc-400 text-sm font-medium mb-2'>This name will appear on your profile</span>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => { onChange(e, "name") }}
                                    autoComplete='true'
                                    className={`py-3 pl-3 rounded-md bg-[#121212] text-white border outline-none ${isErr.name ? "border-red-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-red-500" : "border-zink-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-white"}`}
                                />
                                {isErr.name ? <Error err={error.name} /> : ""}
                            </div>
                            <div className='mb-5'>
                                <span className='text-white font-medium'>Date of Birth</span>
                                <p className='text-zinc-400 text-sm font-medium mb-2'>Why did we need your date of birth? <a href="/" className='underline'>Learn more</a></p>
                                <div className='flex flex-row items-start gap-2'>
                                    <input
                                        type="text"
                                        name='year'
                                        id='year'
                                        value={data.year}
                                        onChange={(e) => { onChange(e, "year") }}
                                        placeholder='YYYY'
                                        className={`py-3 pl-3 rounded-md bg-[#121212] text-white w-1/3 border outline-none ${isErr.year || isErr.dob ? "border-red-500 focus:outline-[1.8px] focus:outline-offset-[-2.5px] focus:outline-red-500" : "border-zink-500 focus:outline-[1.8px] focus:outline-offset-[-2.5px] focus:outline-white"}`}
                                    />
                                    <div className="w-1/2 relative" tabIndex={0}>
                                        <div
                                            className={`bg-[#121212] w-full cursor-pointer text-white p-3 flex items-center justify-between rounded border outline-none ${isErr.month || isErr.dob ? "border-red-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-red-500" : "border-zink-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-white"}`}
                                            onClick={handleDropdownClick}
                                        >
                                            {data.month}
                                            <Icon icon={isOpen ? "fa-solid:caret-down" : "fa-solid:caret-up"} />
                                        </div>
                                        {isOpen && (
                                            <ul className="absolute bg-[#121212] w-full max-h-56 border-2 border-gray-500 overflow-y-auto">
                                                <li className="text-gray-400 bg-slate-200">Month</li>
                                                {months.map((e) => (
                                                    <li key={e} className="hover:bg-blue-600 text-white cursor-pointer" onClick={() => { setIsOpen(prev => !prev); onChange(e, "month") }}>{e}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        name="day"
                                        id="day"
                                        value={data.day}
                                        onChange={(e) => { onChange(e, "day") }}
                                        placeholder='DD'
                                        className={`py-3 pl-3 rounded-md bg-[#121212] text-white w-1/4 border outline-none ${isErr.day || isErr.dob ? "border-red-500 focus:outline-[1.8px] focus:outline-offset-[-2.5px] focus:outline-red-500" : "border-zink-500 focus:outline-[1.8px] focus:outline-offset-[-2.5px] focus:outline-white"}`}
                                        maxLength="2"
                                    />
                                </div>
                                {isErr.dob ? <Error err={error.dob} /> : null}
                                {isErr.year ? <Error err={error.year} /> : null}
                                {isErr.month ? <Error err={error.month} /> : null}
                                {isErr.day ? <Error err={error.day} /> : null}
                            </div>
                            <div className='text-white flex flex-col justify-start'>
                                <span className='font-semibold'>Gender</span>
                                <span className='text-zinc-400 font-medium text-sm'>We use you gender to personalize our content recommendations and ads for you.</span>
                                <div className='flex flex-wrap mt-3'>
                                    <div className='flex flex-row items-center gap-2 max-w-fit'>
                                        <input
                                            type="radio"
                                            name="gender"
                                            id="man"
                                            value="Man"
                                            onChange={(e) => { onChange(e, "gender") }}
                                            className='appearance-none w-4 h-4 rounded-full bg-[#121212] border border-gray-500 checked:border-4 checked:border-green-400'
                                        />
                                        <label htmlFor="man" className='pr-5'>Man</label>
                                    </div>

                                    <div className='flex flex-row items-center gap-2 max-w-fit'>
                                        <input
                                            type="radio"
                                            name="gender"
                                            id="woman"
                                            value="woman"
                                            onChange={(e) => { onChange(e, "gender") }}
                                            className='appearance-none w-4 h-4 rounded-full bg-[#121212] border border-gray-500 checked:border-4 checked:border-green-400'
                                        />
                                        <label htmlFor="woman" className='pr-5'>Woman</label>
                                    </div>

                                    <div className='flex flex-row items-center gap-2 max-w-fit'>
                                        <input
                                            type="radio"
                                            name="gender"
                                            id="non-binary"
                                            value="non-binary"
                                            onChange={(e) => { onChange(e, "gender") }}
                                            className='appearance-none w-4 h-4 rounded-full bg-[#121212] border border-gray-500 checked:border-4 checked:border-green-400'
                                        />
                                        <label htmlFor="non-binary" className='pr-5'>Non-binary</label>
                                    </div>

                                    <div className='flex flex-row items-center gap-2 max-w-fit'>
                                        <input
                                            type="radio"
                                            name="gender"
                                            id="somethingElse"
                                            value="somethingElse"
                                            onChange={(e) => { onChange(e, "gender") }}
                                            className='appearance-none w-4 h-4 rounded-full bg-[#121212] border border-gray-500 checked:border-4 checked:border-green-400'
                                        />
                                        <label htmlFor="somethingElse" className='pr-5'>Something else</label>
                                    </div>

                                    <div className='flex flex-row items-center gap-2 max-w-fit'>
                                        <input
                                            type="radio"
                                            name="gender"
                                            id="preferNotToSay"
                                            value="preferNotToSay"
                                            onChange={(e) => { onChange(e, "gender") }}
                                            className='appearance-none w-4 h-4 rounded-full bg-[#121212] border border-gray-500 checked:border-4 checked:border-green-400'
                                        />
                                        <label htmlFor="preferNotToSay" className='pr-5'>Prefer not to say</label>
                                    </div>
                                </div>
                                {isErr.gender ? <Error err={error.gender} /> : null}
                            </div>
                        </div>
                        <div className='mt-20 md:mt-16'>
                            <div className='text-center w-full py-3 bg-green-600 rounded-3xl mt-5 cursor-pointer' onClick={next}>
                                <span className='font-bold text-black'>Next</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hidden justify-center page' id='page4'>
                <div className='flex flex-col w-full px-8 xsm:w-[550px]'>
                    <div className='w-full flex justify-start bg-zinc-400'>
                        <div className="w-[100%] h-[2.75px] bg-green-500" ></div>
                    </div>
                    <div className='xsm:px-9'>
                        <div className="flex flex-row items-center mt-4">
                            <span className="material-symbols-outlined text-zinc-400 cursor-pointer" onClick={back}>
                                arrow_back_ios
                            </span>
                            <div className="flex flex-col gap-1 text-white">
                                <span className='text-zinc-400'>Step 3 of 3</span>
                                <span>Terms & conditions</span>
                            </div>
                        </div>

                        <div className='mt-8'>
                            <div className="py-4 pl-4 bg-neutral-800 rounded mb-3">
                                <div className='flex flex-row items-start py-1'>
                                    <label id='check-box-1' className='relative cursor-pointer'>
                                        <input
                                            type="checkbox"
                                            name=""
                                            id="check-box-1"
                                            className="appearance-none cursor-pointer h-4 w-4 mt-1 rounded-[3px] bg-[#121212] checked:bg-green-500 checked:border-green-500 border border-gray-400 focus:border-green-500"
                                        />
                                        <span className="material-symbols-outlined absolute hidden left-0 top-0 text-base font-bold check-1">
                                            done
                                        </span>
                                    </label>
                                    <p className='font-medium text-white text-[13px] pl-3 pr-6'>I would prefer not to receive marketing messages from Spotify</p>
                                </div>
                            </div>
                            <div className="py-4 pl-4 bg-neutral-800 rounded">
                                <div className='flex flex-row items-start py-1'>
                                    <label id='check-box-2' className='relative cursor-pointer'>
                                        <input
                                            type="checkbox"
                                            name=""
                                            id="check-box-2"
                                            className="appearance-none cursor-pointer h-4 w-4 mt-1 rounded-[3px] bg-[#121212] checked:bg-green-500 checked:border-green-500 border border-gray-400 focus:border-green-500"
                                        />
                                        <span className="material-symbols-outlined absolute hidden left-0 top-0 text-base font-bold check-2">
                                            done
                                        </span>
                                    </label>
                                    <p className='font-medium text-white text-[13px] pl-3 pr-6'>Share my registration data with Spotify's content providers for marketing purposes.</p>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <p className='text-white text-sm font-normal'>
                                    By clicking on sign-up, you agree to Spotify's <a href="/" className='underline text-green-500'>Terms and Conditions of Use.</a>
                                </p>
                                <p className='text-white text-sm font-normal mt-2'>
                                    To learn more about how Spotify collects, uses, shares and protects your personal data, please see
                                    <a href="/" className='underline text-green-500'>Spotify's Privacy Policy.</a>
                                </p>
                            </div>
                        </div>
                        <div className='mt-20 md:mt-16'>
                            <div className='text-center w-full py-3 bg-green-600 rounded-3xl mt-5 cursor-pointer' onClick={signup}>
                                <span className='font-bold text-black'>Sign up</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup