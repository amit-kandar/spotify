import React from 'react';
import Navbar from '../components/Navbar';
import Playlists from '../components/Playlists';
import data from '../utils/data';
import Player from '../components/Player';

function Home() {
    const img_url = 'https://i.scdn.co/image/ab67706f00000002118ecaf6c5151716f13fd0b1',
        title = "I Wanna Be With You(On Chritsmas Day)",
        playlistName = "The National Parks",
        duration = 2.57,
        track = require('../utils/The National Parks __ I Wanna Be With You (On Christmas Day) (Official Visualizer).mp3');
    return (
        <div className='relative min-w-full min-h-screen cursor-pointer bg-[#121212]' >
            <div className='flex flex-row justify-between items-center p-4'>
                <h1 className="text-white text-2xl font-bold">Good Afternoon</h1>
                <i className='bx bx-cog text-white pr-3 text-3xl'></i>
            </div>
            <Navbar />
            <Playlists list={data} />
            <Player img_url={img_url} title={title} duration={duration} playlistName={playlistName} track={track} />
        </div>
    )
}

export default Home;
