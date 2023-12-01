import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import countries from '../utils/CountryMobileCode';
import Error from '../components/Error';

function SignupByPhone() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("+91");
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [buttonClass, setButtonClass] = useState("bg-green-900");

    useEffect(() => {
        setButtonClass(input === "" ? "bg-green-900" : "bg-green-500");
    }, [input]);

    const checkInputLength = () => {
        setError(input.length !== 9);
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
        checkInputLength();
    };

    const handleDropdownClick = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className='bg-black min-w-[320px] min-h-screen'>
            <div className='w-full py-8 pl-8 md:py-7'>
                <Icon icon="logos:spotify" width="110" />
            </div>
            <div className="flex justify-center items-center">
                <div className='w-full md:max-w-[734px] px-8 md:pt-10 flex flex-col text-center'>
                    <h1 className="text-white text-lg font-bold mb-2">Enter phone number</h1>
                    <div className="w-full flex flex-row gap-3">
                        <div className="w-1/4">
                            <div className="bg-[#121212] w-full border border-zinc-500 outline-white cursor-pointer text-white p-3 flex items-center justify-between rounded" onClick={handleDropdownClick}>
                                {selected}
                                <Icon icon={isOpen ? "fa-solid:caret-down" : "fa-solid:caret-up"} />
                            </div>
                            {isOpen && (
                                <ul className="bg-[#121212] w-16 max-h-52 overflow-y-auto">
                                    {countries.map((e) => (
                                        <li key={e.code} className="hover:bg-blue-600 text-white cursor-pointer" onClick={() => { setSelected(e.code); setIsOpen((prev) => !prev) }}>{e.code}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="w-2/3">
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Phone number"
                                className={`w-full pl-3 py-3 bg-[#121212] text-white rounded border outline-none ${error ? "border-red-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-red-500" : "border-zink-500 focus:outline-[3.5px] focus:outline-offset-[-3px] focus:outline-white"}`}
                            />
                            {error && <Error err="Please enter your phone number" />}
                        </div>
                    </div>
                    <div className="w-full flex justify-center md:justify-start mt-14">
                        <button className={`text-black font-bold py-3 w-full md:w-28 rounded-3xl ${buttonClass}`}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupByPhone;
