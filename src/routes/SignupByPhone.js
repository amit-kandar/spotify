import React, { useState } from "react";
import { Icon } from '@iconify/react';
import countries from '../utils/CountryMobileCode';
import Error from '../components/Error';
import { useNavigate } from "react-router-dom";
import Spinner from '../assets/Rolling-1s-200px.svg';
import axios from '../config/axios';

function SignupByPhone() {
    const [isOpen, setIsOpen] = useState(false);
    const [countryCode, setCountryCode] = useState("+91");
    const [number, setNumber] = useState("");
    const [error, setError] = useState(false);
    const [buttonClass, setButtonClass] = useState("bg-green-900");
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const checkInputLength = (number) => {
        setError(number.length !== 10);
    };

    const handleNumberChange = (e) => {
        const data = e.target.value;
        setNumber(data);
        checkInputLength(data);
        setButtonClass(data.length !== 10 ? "bg-green-900" : "bg-green-500");

    };

    const handleDropdownClick = () => {
        setIsOpen((prev) => !prev);
    };

    const handleNext = async () => {
        if (!error && number.length === 10) {
            try {
                setIsLoading(true);
                setButtonClass("bg-green-900")
                const body = {
                    phoneNumber: countryCode + number
                }
                await axios.post('/auth/signup/phone/send-otp', body);
            } catch (error) {
                console.log(error);
                setError(true);
            } finally {
                setIsLoading(false);
                const numberPage = document.getElementById('number-page');
                const codePage = document.getElementById('code-page');

                numberPage.classList.replace('flex', 'hidden');
                codePage.classList.replace('hidden', 'flex');
            }
        }
    }

    const handleCodeChange = (e) => {
        const data = e.target.value;
        setCode(data);
        setButtonClass(data.length !== 6 ? "bg-green-900" : "bg-green-500");

    }

    const handleCode = async () => {
        if (code.length !== 6)
            setError(prev => !prev);
        else {
            try {
                setIsLoading(true);
                setButtonClass("bg-green-900")
                const body = {
                    phoneNumber: countryCode + number,
                    otpCode: code
                }
                await axios.post('/auth/signup/phone/verifyotp', body);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
                navigate('/')
            }
        }

    }

    return (
        <div className='bg-black min-w-[320px] min-h-screen'>
            <div className='w-full py-8 pl-8 md:py-7'>
                <Icon icon="logos:spotify" width="110" />
            </div>
            <div className="flex justify-center items-center" id="number-page">
                <div className='w-full md:max-w-[734px] px-8 md:pt-10 flex flex-col text-center'>
                    <h1 className="text-white text-lg font-bold mb-2">Enter phone number</h1>
                    <div className="w-full flex flex-row gap-3">
                        <div className="w-1/4">
                            <div className="bg-[#121212] w-full border border-zinc-500 outline-white cursor-pointer text-white p-3 flex items-center justify-between rounded" onClick={handleDropdownClick}>
                                {countryCode}
                                <Icon icon={isOpen ? "fa-solid:caret-down" : "fa-solid:caret-up"} />
                            </div>
                            {isOpen && (
                                <ul className="bg-[#121212] w-16 max-h-52 overflow-y-auto">
                                    {countries.map((e) => (
                                        <li key={e.code} className="hover:bg-blue-600 text-white cursor-pointer" onClick={() => { setCountryCode(e.code); setIsOpen((prev) => !prev) }}>{e.code}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="w-2/3">
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={number}
                                onChange={handleNumberChange}
                                placeholder="Phone number"
                                className={`w-full pl-3 py-3 bg-[#121212] text-white rounded border outline-none ${error ? "border-red-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-red-500" : "border-zink-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-white"}`}
                            />
                            {error && <Error err="Please enter your phone number" />}
                        </div>
                    </div>
                    <div className="w-full flex justify-center md:justify-start mt-14">
                        <div className="w-full flex flex-row gap-3">
                            <button className={`text-black font-bold py-3 w-full md:w-28 rounded-3xl ${buttonClass}`} onClick={handleNext}>Send</button>
                            {isLoading ? <img src={Spinner} alt="loader" className="w-10" /> : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden justify-center items-center" id="code-page">
                <div className='w-full md:max-w-[734px] px-8 md:pt-10 flex flex-col text-center'>
                    <h1 className="text-white text-base font-semibold mb-2">Enter your code</h1>
                    <div className="w-full">
                        <input
                            type="text"
                            name="code"
                            id="code"
                            value={code}
                            onChange={handleCodeChange}
                            placeholder="6-digit code"
                            className={`w-full pl-3 py-3 bg-[#121212] text-white rounded border outline-none ${error ? "border-red-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-red-500" : "border-zink-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-white"}`}
                        />
                        {error && <Error err="Please enter your 6-digit code" />}
                    </div>
                    <div className="w-full flex flex-col items-start gap-2 md:flex-row md:justify-between mt-14">
                        <a href="/" className="text-white">Get a new code</a>
                        <div className="flex flex-row gap-3">
                            <button className={`text-black font-bold py-3 px-10 md:w-28 rounded-3xl ${buttonClass}`} onClick={handleCode}>Next</button>
                            {isLoading ? <img src={Spinner} alt="loader" className="w-10" /> : null}
                        </div>
                    </div>

                    <div className="w-full mt-14 text-white">
                        <span>We sent an sms with a 6-digit code to {countryCode + number}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupByPhone;
