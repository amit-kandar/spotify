import React, { useState, useEffect, useRef } from 'react';
import TruncateText from './TruncateText';
import Spinner from '../assets/Rolling-0.5s-197px.svg';
import { formatDuration } from '../utils/functions';

// Expand function moved out of the component
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


function Player({ img_url, title, playlistName, track }) {
    const [isPlay, setIsPlay] = useState(false);
    const [like, setLike] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [sliderTime, setSliderTime] = useState(0);
    const [repeat, setRepeat] = useState(false);

    const audioRef = useRef(new Audio(track));

    const handleLike = () => {
        setLike(prev => !prev);
    };

    const handlePlay = () => {
        if (isPlay) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlay(prev => !prev);
    };

    useEffect(() => {
        if (track) {
            audioRef.current.src = track;
            audioRef.current.load();
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [track]);

    useEffect(() => {
        const audio = audioRef.current;

        if (repeat)
            audio.loop = true;
        else
            audio.loop = false;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };
        const handleSongEnd = () => {
            setIsPlay(prev => !prev);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleSongEnd);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleSongEnd);
        };
    }, [repeat]);

    useEffect(() => {
        setSliderTime(currentTime);
    }, [currentTime]);

    const handleRangeChange = (e) => {
        const newTime = parseFloat(e.target.value);
        audioRef.current.currentTime = newTime;
        setSliderTime(newTime);
    }

    const handleRepeat = () => {
        setRepeat(prev => !prev);
    }

    return (
        <div>
            <div className='fixed block bottom-[70px] z-50 w-full px-2' id='small-block'>
                <div className="w-full rounded-lg bg-[#364139] flex flex-row justify-between items-center">
                    <div className='flex flex-row min-w-[65%] items-center' onClick={expand}>
                        <div className='min-w-[44px] h-11 m-2'>
                            <img src={img_url} alt="thumbnail" className='rounded-md w-full h-full' />
                        </div>

                        <div className='text-white w-full xsm:w-fit overflow-x-scroll flex flex-col whitespace-nowrap scrollbar-hide text-left'>
                            <h1 className='capitalize text-[13px] font-bold animate-infinite-scroll xsm:animate-none'>
                                {title}
                            </h1>
                            <p className='text-xs'>{playlistName}</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-evenly w-2/5'>
                        {like ?
                            <i className='bx bxs-heart text-[27px] text-neutral-300 cursor-pointer' onClick={handleLike}></i>
                            :
                            <i className='bx bx-heart text-[27px] text-neutral-300 cursor-pointer' onClick={handleLike}></i>
                        }
                        {
                            isLoading ?
                                <div className='relative' onClick={handlePlay}>
                                    <img src={Spinner} alt="" className='absolute top-0' />
                                    {isPlay ?
                                        <i className='bx bx-pause text-4xl text-white cursor-pointer' onClick={handlePlay}></i>
                                        :
                                        <i className='bx bx-play text-4xl text-white cursor-pointer' onClick={handlePlay}></i>}
                                </div>
                                :
                                <div>
                                    {isPlay ?
                                        <i className='bx bx-pause text-4xl text-white cursor-pointer' onClick={handlePlay}></i>
                                        :
                                        <i className='bx bx-play text-4xl text-white cursor-pointer' onClick={handlePlay}></i>
                                    }
                                </div>
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
                    <div className='w-full flex flex-row items-center justify-between gap-3 px-3 mb-4'>
                        <div className='text-white w-full xsm:w-fit overflow-x-scroll flex flex-col whitespace-nowrap scrollbar-hide text-left'>
                            <h1 className='capitalize text-2xl font-semibold  w-full animate-infinite-scroll xsm:animate-none'>
                                {title}
                            </h1>
                            <p className='text-base'>{playlistName}</p>
                        </div>
                        {like ?
                            <i className='bx bxs-heart text-3xl text-neutral-300 cursor-pointer' onClick={handleLike}></i>
                            :
                            <i className='bx bx-heart text-3xl text-neutral-300 cursor-pointer' onClick={handleLike}></i>
                        }
                    </div>
                    <div className="w-full px-3">
                        <input
                            type="range"
                            name="progress"
                            min={0}
                            max={duration}
                            value={sliderTime}
                            onChange={handleRangeChange}
                            id="progress"
                            className="w-full bg-gray-400 h-1 rounded"
                        />
                        <div className='flex justify-between items-center flex-row'>
                            <span className='text-white text-xs font-sans'>{formatDuration(currentTime)}</span>
                            <span className='text-white text-xs font-sans'>{formatDuration(duration)}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center px-3 w-full mt-6">
                        <i className='bx bx-shuffle text-3xl text-zinc-500'></i>
                        <i className='bx bx-skip-previous text-5xl text-white' ></i>
                        {
                            isLoading ?
                                <div className='relative' onClick={handlePlay}>
                                    <img src={Spinner} alt="" className='absolute top-0 mix-blend-multiply' />
                                    <div className='w-14 h-14 flex justify-center items-center rounded-full bg-white'>

                                        {isPlay ? <i className='bx bx-pause text-4xl text-black' ></i> : <i className='bx bx-play text-4xl text-black' ></i>}
                                    </div>
                                </div>

                                :
                                <div className='w-14 h-14 flex justify-center items-center rounded-full bg-white' onClick={handlePlay}>
                                    {isPlay ? <i className='bx bx-pause text-4xl text-black' ></i> : <i className='bx bx-play text-4xl text-black' ></i>}
                                </div>

                        }
                        <i className='bx bx-skip-next text-5xl text-white' ></i>
                        <i className={`bx bx-repeat text-3xl ${repeat ? 'text-white' : 'text-zinc-500'}`} onClick={handleRepeat} ></i>
                    </div>

                    <div className='w-full flex justify-between items-center px-3 mt-10'>
                        <i className='bx bxs-devices text-xl text-gray-100' ></i>
                        <i className='bx bx-share-alt text-xl text-gray-100' ></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Player