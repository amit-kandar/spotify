import React, { useEffect, useState } from 'react';
import TruncateText from './TruncateText';

function Player({ img_url, title, playlistName, track, duration }) {
    const [isPlay, setIsPlay] = useState(true);
    const [like, setLike] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [mainBlockPosition, setMainBlockPosition] = useState('fixed');

    const handleLike = () => {
        setLike(prev => !prev)
    }
    const handlePlay = () => {
        setIsPlay(prev => !prev);
    }

    const expand = () => {
        setExpanded(prev => !prev);
        setMainBlockPosition(prevPosition => prevPosition === 'fixed' ? 'absolute' : 'fixed');

        // Disable body scroll when main block is expanded
        if (!expanded) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);  // Scroll to top
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);


    title = "I Wanna Be With You(On Christmas Day)"
    playlistName = "The National Parks"
    duration = 2.57;

    return (
        <div>
            <div className={`fixed bottom-[130px] z-50 w-full px-2 transition-transform ${expanded ? 'transform-none' : 'transform translate-y-full'
                }`} id='small-block'>
                <div className="w-full rounded-lg h-14 bg-[#364139] flex flex-row justify-between items-center">
                    <div
                        className='flex flex-row min-w-[77%] items-center'
                        onClick={expand}>
                        <div className='min-w-[44px] h-11 m-2'>
                            <img src={img_url}
                                alt="thumbnail"
                                className='rounded-md w-full h-full' />
                        </div>

                        <div className='text-white w-40 xsm:w-fit overflow-x-scroll flex flex-col whitespace-nowrap scrollbar-hide text-left'>
                            <h1 className='capitalize text-sm font-semibold  w-full animate-infinite-scroll xsm:animate-none'>
                                {title}
                            </h1>
                            <p className='text-sm text-[rgba(255,255,255,0.7)]'>The National Parks</p>
                        </div>
                    </div>

                    <div className='gap-3 flex items-center'>
                        {
                            like
                                ? <i onClick={handleLike}
                                    className='bx bxs-heart text-3xl text-[#32ff5e] cursor-pointer'>
                                </i>
                                : <i onClick={handleLike}
                                    className='bx bx-heart text-3xl text-neutral-300 cursor-pointer'>
                                </i>
                        }
                        {
                            isPlay
                                ? <i onClick={handlePlay}
                                    className='bx bx-play text-4xl text-white cursor-pointer'>
                                </i>
                                : <i onClick={handlePlay}
                                    className='bx bx-pause text-4xl text-white cursor-pointer'>
                                </i>
                        }
                    </div>
                </div>
            </div>

            <div className={`fixed w-full min-h-screen top-0 z-50 bg-[#364139] transition-transform ${expanded ? 'transform-none' : 'transform translate-y-full'
                }`}
                style={{ position: mainBlockPosition }}
                id='main-block'>
                <div className='w-full flex flex-col items-center p-4'>
                    <div className='w-full flex justify-evenly gap-3 items-center text-white mb-10 p-3'>
                        <svg role="img"
                            data-encore-id="icon"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="w-7 cursor-pointer"
                            onClick={expand}>
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
                            <p className='text-base text-[rgba(255,255,255,0.7)]'>{playlistName}</p>
                        </div>
                        {
                            like
                                ? <i onClick={handleLike}
                                    className='bx bxs-heart text-3xl text-[#32ff5e] cursor-pointer p-3'>
                                </i>
                                : <i onClick={handleLike}
                                    className='bx bx-heart text-3xl text-neutral-300 cursor-pointer p-3'>
                                </i>
                        }
                    </div>

                    {/* ~~~~~ Progress Bar starts ~~~~~ */}
                    <div className="w-full px-3">
                        <input type="range"
                            name="progress"
                            id="progress"
                            className="player-progress appearance-none w-full bg-gray-400 rounded" />
                        <div className='flex justify-between items-center flex-row'>
                            <span className='text-white text-xs font-sans'>0.00</span>
                            <span className='text-white text-xs font-sans'>{duration}</span>
                        </div>
                    </div>
                    {/* ~~~~~ Progress Bar ends ~~~~~ */}

                </div>
            </div>
        </div>
    )
}

export default Player