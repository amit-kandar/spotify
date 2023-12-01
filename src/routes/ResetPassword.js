import React from 'react'
import { Icon } from '@iconify/react';

function ResetPassword() {
    return (
        <div className='bg-[#121212] min-w-full min-h-screen'>
            <div className='w-full py-10 pl-10 md:py-7'>
                <Icon icon="logos:spotify" width="110" />
            </div>
            <div className='flex items-center justify-center flex-col px-10 '>
                <div className='max-w-[450px] flex items-center justify-center flex-col'>
                    <h2 className='text-3xl text-white font-bold'>Password Reset</h2>
                    <p className='pt-9 text-center text-zinc-400'>Enter your Spotify username, or the email address that you used to register. We'll send you an email with your username and a link to reset your password.</p>
                    <div className='py-5'>
                        <label htmlFor="email&username" className='text-white font-semibold'>Email address or username</label>

                        <input type="text" name="email" id="email&username" placeholder='Email address or username' className='w-full mt-2 bg-[#121212] border pl-3 py-3 rounded text-white outline-white' />
                    </div>
                    <div className='py-3 px-8 bg-green-500 rounded-3xl cursor-pointer'>
                        <span className='font-semibold'>Send</span>
                    </div>
                    <p className='pt-5 text-white text-center'>If you still need help, check out <a href="/" className='underline'>Spotify Support</a></p>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword