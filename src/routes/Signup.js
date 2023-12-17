import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Warning from '../components/Warning';
import Error from '../components/Error';
import Spinner from '../assets/Rolling-1s-200px.svg';
import { checkEmailExists } from '../utils/authService';
import { showPassword } from '../utils/functions';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import SignupSchema from '../schemas/SignupSchema';
import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';
import { SIGNUP } from '../constant';


const initialValues = {
    email: "",
    password: "",
    name: "",
    year: "",
    month: "",
    day: "",
    gender: ""
}

const options = [
    { name: 'January', value: 1, label: 'January' },
    { name: 'February', value: 2, label: 'February' },
    { name: 'March', value: 3, label: 'March' },
    { name: 'April', value: 4, label: 'April' },
    { name: 'May', value: 5, label: 'May' },
    { name: 'June', value: 6, label: 'June' },
    { name: 'July', value: 7, label: 'July' },
    { name: 'August', value: 8, label: 'August' },
    { name: 'September', value: 9, label: 'September' },
    { name: 'October', value: 10, label: 'October' },
    { name: 'November', value: 11, label: 'November' },
    { name: 'December', value: 12, label: 'December' },
];

function Signup() {
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailExists, setIsEmailExists] = useState(false);
    const [emailWarningText, setEmailWarningText] = useState('');
    const [step, setStep] = useState(0);
    const [isValid, setIsValid] = useState({
        email: false,
        password: false,
        name: false,
        year: false,
        month: false,
        day: false,
        gender: false
    });

    const totalsteps = 3;
    const navigate = useNavigate();

    const {
        values,
        handleBlur,
        handleChange,
        errors,
        handleSubmit,
        touched,
        validateForm
    } = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema[step],
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                setIsLoading(true);
                const response = await axios.post(SIGNUP, values);
                if (response.status === 409)
                    return console.error(response.data.message);
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                navigate('/');
            } catch (error) {
                console.error('Error during signup:', error);
            } finally {
                setIsLoading(false);
            }
        }
    });

    const next = () => {
        validateForm().then((formErrors) => {
            const errors = formErrors || {}; // Handling potential null errors

            if (Object.keys(errors).length === 0 && !isEmailExists) {
                setStep((prevStep) => prevStep + 1);
            } else if (step === 0) {
                setIsValid(prev => ({ ...prev, email: true }));
            } else if (step === 1) {
                setIsValid(prev => ({ ...prev, password: true }));
            } else if (step === 2) {
                const errorFields = ['name', 'year', 'month', 'day', 'gender'];

                const isValidFields = {};
                errorFields.forEach(field => {
                    isValidFields[field] = values[field] !== '';
                });

                setIsValid(prev => ({ ...prev, ...isValidFields }));

            }
        });
    };

    const back = () => {
        setStep(s => s - 1);
    };

    useEffect(() => {
        if (values.email !== "" && !errors.email) {
            checkEmailExists(values.email, setIsEmailExists, setEmailWarningText, Link);
        } else {
            setIsEmailExists(false);
        }

        const fields = ['name', 'year', 'month', 'day', 'gender'];
        const isValidFields = {};

        fields.forEach(field => {
            isValidFields[field] = false;
        });

        setIsValid(isValidFields);
    }, [values.email, errors.email, values]);


    return (
        <div className='bg-[#121212] min-w-full min-h-screen'>
            <div className='w-full py-8 pl-8 md:py-7' onClick={back}>
                <Icon icon="logos:spotify" width="110" />
            </div>
            <form onSubmit={handleSubmit}>
                {step === 0 &&
                    <div className='flex justify-center page' id='page1'>
                        <div className='flex flex-col px-8 sm:max-w-[380px]'>
                            <h1 className='text-4xl font-bold text-white mb-10 md:text-5xl'>Sign up to start listening</h1>
                            <div className='w-full flex flex-col'>
                                <label htmlFor="email" className='text-white font-semibold mb-2'>Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='name@domain.com'
                                    autoComplete='true'
                                    className={`py-3 pl-3 text-white bg-inherit rounded border outline-none ${(errors.email && touched.email) || isEmailExists || isValid.email ? "border-red-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-red-500" : "border-zink-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-white"}`}
                                />
                                {(errors.email && touched.email) || isValid.email ? <Error err={errors.email} /> : null}
                                {isEmailExists ? <Warning text={emailWarningText} /> : null}
                            </div>
                            <Link to="/login/phone" className='mt-2 text-green-400 font-semibold underline max-w-fit'>Use phone number instead.</Link>
                            <div className='w-full mt-5 flex flex-row gap-3 items-center'>
                                <div className="text-center w-full py-3 bg-green-500 rounded-3xl cursor-pointer" tabIndex={0} onClick={next}>
                                    <span className='font-bold text-black'>Next</span>
                                </div>
                                {isLoading ? <img src={Spinner} alt="loader" className="w-10" /> : null}
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

                }
                {step === 1 &&
                    <div className='flex justify-center page' id='page2'>
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
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Password'
                                            autoComplete='new-password'
                                            className={`py-3 pl-3 rounded-md bg-[#121212] text-white w-full border outline-none ${(errors.password && touched.password) || isValid.password ? "border-red-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-red-500" : "border-zink-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-white"}`}
                                        />
                                        <i className="fa-regular fa-eye-slash text-white absolute right-3 text-xl" id='eye' onClick={showPassword}></i>
                                    </div>
                                    {(errors.password && touched.password) || isValid.password ? <Error err={errors.password} /> : null}
                                    <p className="text-zinc-400 text-sm text-left mt-2">The password must contain at least 8 characters. We recommend including at least 1 number and 1 special character.</p>
                                </div>
                                <div className='mt-36 md:mt-16'>
                                    <div className="text-center w-full py-3 bg-green-500 rounded-3xl mt-5 cursor-pointer" onClick={next}>
                                        <span className='font-bold text-black'>Next</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {step === 2 &&
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
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoComplete='true'
                                            className={`py-3 pl-3 rounded-md bg-[#121212] text-white border outline-none ${(errors.name && touched.name) || isValid.name ? "border-red-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-red-500" : "border-zink-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-white"}`}
                                        />
                                        {(errors.name && touched.name) || isValid.name ? <Error err={errors.name} /> : ""}
                                    </div>
                                    <div className='mb-5'>
                                        <span className='text-white font-medium'>Date of Birth</span>
                                        <p className='text-zinc-400 text-sm font-medium mb-2'>Why did we need your date of birth? <a href="/" className='underline'>Learn more</a></p>
                                        <div className='flex flex-row items-start gap-2'>
                                            <input
                                                type="number"
                                                name='year'
                                                id='year'
                                                value={values.year}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder='YYYY'
                                                className={`py-3 pl-3 rounded-md bg-[#121212] text-white w-1/3 border outline-none ${(errors.year && touched.year) || isValid.year ? "border-red-500 focus:outline-[1.8px] focus:outline-offset-[-2.5px] focus:outline-red-500" : "border-zink-500 focus:outline-[1.8px] focus:outline-offset-[-2.5px] focus:outline-white"}`}
                                            />
                                            <div className="w-1/2 relative" tabIndex={0}>
                                                <select name="month" id="month" onChange={handleChange} value={values.month} onBlur={handleBlur} className={`w-full py-3 px-3 rounded-md bg-[#121212] text-white border outline-none ${(errors.month && touched.month) || isValid.month ? "border-red-500 focus:outline-[1.8px] focus:outline-offset-[-2.5px] focus:outline-red-500" : "border-zink-500 focus:outline-[1.8px] focus:outline-offset-[-2.5px] focus:outline-white"}`}>
                                                    <option value="0">Month</option>
                                                    {options.map((option, index) => (
                                                        <option key={index} value={option.value}>
                                                            {option.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <input
                                                type="text"
                                                name="day"
                                                id="day"
                                                value={values.day}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder='DD'
                                                className={`py-3 pl-3 rounded-md bg-[#121212] text-white w-1/4 border outline-none ${(errors.day && touched.day) || isValid.day ? "border-red-500 focus:outline-[1.8px] focus:outline-offset-[-2.5px] focus:outline-red-500" : "border-zink-500 focus:outline-[1.8px] focus:outline-offset-[-2.5px] focus:outline-white"}`}
                                                maxLength="2"
                                            />
                                        </div>
                                        {(errors.year && touched.year) || isValid.year ? <Error err={errors.year} /> : null}
                                        {(errors.month && touched.month) || isValid.month ? <Error err={errors.month} /> : null}
                                        {(errors.day && touched.day) || isValid.day ? <Error err={errors.day} /> : null}
                                    </div>
                                    <div className='text-white flex flex-col justify-start'>
                                        <span className='font-semibold'>Gender</span>
                                        <span className='text-zinc-400 font-medium text-sm'>We use your gender to personalize our content recommendations and ads for you.</span>
                                        <div className='flex flex-wrap mt-3'>
                                            <div className='flex flex-row items-center gap-2 max-w-fit'>
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    id="man"
                                                    value="man"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
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
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
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
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
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
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
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
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='appearance-none w-4 h-4 rounded-full bg-[#121212] border border-gray-500 checked:border-4 checked:border-green-400'
                                                />
                                                <label htmlFor="preferNotToSay" className='pr-5'>Prefer not to say</label>
                                            </div>
                                        </div>
                                        {(errors.gender && touched.gender) || isValid.gender ? <Error err={errors.gender} /> : null}
                                    </div>
                                </div>
                                <div className='mt-20 md:mt-16'>
                                    <div className="text-center w-full py-3 bg-green-500 rounded-3xl mt-5 cursor-pointer" onClick={next}>
                                        <span className='font-bold text-black'>Next</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {step === totalsteps &&
                    <div className='flex justify-center page' id='page4'>
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
                                <div className='mt-20 md:mt-16 flex flex-row gap-3 items-center'>
                                    <button type='submit' className="text-center w-full py-3 bg-green-500 rounded-3xl mt-5 cursor-pointer font-bold text-black">Sign up</button>
                                    {isLoading ? <img src={Spinner} alt="loader" className="w-10 mt-5" /> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </form>

        </div>
    )
}

export default Signup