import React, { useState } from 'react';
import TruncateText from './TruncateText';

function Player({ img_url, title, playlistName, track, duration }) {
    const [isPlay, setIsPlay] = useState(true);
    const [like, setLike] = useState(false);

    const handleLike = () => {
        setLike(prev => !prev)
    }
    const handlePlay = () => {
        setIsPlay(prev => !prev);
    }

    const expand = () => {
        const smallBlock = document.getElementById('small-block');
        const mainBlock = document.getElementById('main-block');

        if (smallBlock.classList.contains('block')) {
            smallBlock.classList.replace('block', 'hidden');
            mainBlock.classList.replace('hidden', 'flex');
        } else {
            smallBlock.classList.replace('hidden', 'block');
            mainBlock.classList.replace('flex', 'hidden');
        }
    };

    title = "I Wanna Be With You(On Chritsmas Day)"
    playlistName = "The National Parks"
    duration = 2.57;


    return (
        <div>
            <div className='fixed block bottom-[70px] z-50 w-full px-2' id='small-block'>
                <div className="w-full rounded-lg h-14 bg-[#364139] flex flex-row justify-between items-center">
                    <div className='flex flex-row min-w-[77%] items-center' onClick={expand}>
                        <div className='min-w-[44px] h-11 m-2'>
                            <img src={img_url} alt="thumbnail" className='rounded-md w-full h-full' />
                        </div>

                        <div className='text-white w-40 xsm:w-fit overflow-x-scroll flex flex-col whitespace-nowrap scrollbar-hide text-left'>
                            <h1 className='capitalize text-sm font-semibold  w-full animate-infinite-scroll xsm:animate-none'>
                                {title}
                            </h1>
                            <p className='text-sm'>The National Parks</p>
                        </div>
                    </div>

                    <div className='gap-3 flex items-center'>
                        {like ?
                            <i className='bx bxs-heart text-3xl text-neutral-300 cursor-pointer' onClick={handleLike}></i>
                            :
                            <i className='bx bx-heart text-3xl text-neutral-300 cursor-pointer' onClick={handleLike}></i>
                        }
                        {isPlay ?
                            <i className='bx bx-play text-4xl text-white cursor-pointer' onClick={handlePlay}></i>
                            :
                            <i className='bx bx-pause text-4xl text-white cursor-pointer' onClick={handlePlay}></i>
                        }
                    </div>
                </div>
            </div>
            <div className='hidden absolute w-full min-h-screen top-0 z-50 bg-[#364139] animate-expand' id='main-block'>
                <div className='w-full flex flex-col items-center p-4'>
                    <div className='w-full flex justify-evenly gap-3 items-center text-white mb-10 p-3'>
                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" className="w-7" onClick={expand}>
                            <path d="M2.793 8.043a1 1 0 0 1 1.414 0L12 15.836l7.793-7.793a1 1 0 1 1 1.414 1.414L12 18.664 2.793 9.457a1 1 0 0 1 0-1.414z" fill='white'></path>
                        </svg>
                        <TruncateText text={title} />
                        <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" className="w-7">
                            <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill='white'></path>
                        </svg>
                    </div>
                    <div className='w-60 h-60 mb-6'>
                        <img src={img_url} alt="thumbnail" />
                    </div>
                    <div className='w-full flex flex-row items-center justify-between px-3 mb-4'>
                        <div className='text-white w-full xsm:w-fit overflow-x-scroll flex flex-col whitespace-nowrap scrollbar-hide text-left'>
                            <h1 className='capitalize text-2xl font-semibold  w-full animate-infinite-scroll xsm:animate-none'>
                                {title}
                            </h1>
                            <p className='text-base'>{playlistName}</p>
                        </div>
                        {like ?
                            <i className='bx bxs-heart text-3xl text-neutral-300 cursor-pointer p-3' onClick={handleLike}></i>
                            :
                            <i className='bx bx-heart text-3xl text-neutral-300 cursor-pointer p-3' onClick={handleLike}></i>
                        }
                    </div>
                    <div className="w-full px-3">
                        <input type="range" name="progress" id="progress" className="appearance-none w-full bg-gray-400 h-1 rounded" />
                        <div className='flex justify-between items-center flex-row'>
                            <span className='text-white text-xs font-sans'>0.00</span>
                            <span className='text-white text-xs font-sans'>{duration}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Player