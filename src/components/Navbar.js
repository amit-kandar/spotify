import React from 'react'
import { Icon } from '@iconify/react';
function Navbar() {
    return (
        <div className='fixed bottom-0 left-0 z-10 w-full py-2 bg-black flex flex-row justify-evenly items-center'>
            <div className='flex flex-col items-center text-white'>
                <i className='bx bxs-home text-2xl'></i>
                <p className='text-sm'>Home</p>
            </div>
            <div className='flex flex-col items-center text-neutral-400'>
                <i className='bx bx-search-alt-2 text-2xl' ></i>
                <p className='text-sm'>Search</p>
            </div>
            <div className='flex flex-col items-center text-neutral-400'>
                <i className='bx bxs-playlist text-2xl'></i>
                <p className='text-sm'>Your Library</p>
            </div>
            <div className='flex flex-col items-center text-neutral-400'>
                <Icon icon="ri:spotify-fill" width={25} />
                <p className='text-sm pt-1'>Get App</p>
            </div>

        </div>
    )
}

export default Navbar;