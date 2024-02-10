import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Playlists from '../components/Playlists';
import data from '../utils/data';
import Player from '../components/Player';
import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';
import { LOGOUT, REFRESH_TOKEN } from '../constant';
import { checkTokenValidity } from '../utils/functions';

function Home() {
    const img_url = 'https://i.scdn.co/image/ab67706f00000002118ecaf6c5151716f13fd0b1';
    const title = "I Wanna Be With You(On Christmas Day)";
    const playlistName = "The National Parks";
    const track = require('../assets/The National Parks __ I Wanna Be With You (On Christmas Day) (Official Visualizer).mp3');

    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const accessToken = localStorage.getItem('accessToken');

                if (!refreshToken && !accessToken) {
                    console.error('Authentication token not found');
                    localStorage.clear();
                    navigate('/login');
                    return; // Exit function if refreshToken is not found
                }

                const data = {
                    refreshToken: refreshToken
                }

                const response = await axios.post(REFRESH_TOKEN, data, { withCredentials: true });
                if (response.data.success) {
                    localStorage.setItem('accessToken', response.data.accessToken);
                    console.log("Set access token");
                }
            } catch (error) {
                console.error('Error:', error);
                navigate('/login');
            }
        };

        const tokenCheckInterval = setInterval(async () => {
            const accessToken = localStorage.getItem('accessToken');
            const refToken = localStorage.getItem('refreshToken');

            if (!refToken || !accessToken) {
                clearInterval(tokenCheckInterval); // Clear interval if tokens are missing
                navigate('/login');
                return;
            }

            const isRefreshTokenValid = checkTokenValidity(refToken);
            console.log("Refresh token valid check: ", isRefreshTokenValid);
            if (!isRefreshTokenValid) {
                navigate('/login');
                return;
            }

            const isAccessTokenValid = checkTokenValidity(accessToken);
            console.log("Access token valid check: ", isAccessTokenValid);
            if (!isAccessTokenValid) {
                await refreshToken();
            }
        }, 60000);

        return () => {
            clearInterval(tokenCheckInterval); // Clear interval on component unmount
        };
    }, [navigate]);

    const logout = async () => {
        try {
            const res = await axios.get(LOGOUT, { withCredentials: true });

            if (res.data.success) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate('/login');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className='relative min-w-full min-h-screen bg-[#000]'>
            <div className='flex flex-row justify-between items-center p-4'>
                <h1 className="text-white text-2xl font-bold">Good Afternoon</h1>
                <i className='bx bx-cog text-white pr-3 text-3xl' onClick={logout}></i>
            </div>
            <Navbar />
            <Playlists list={data} />
            <Player img_url={img_url} title={title} playlistName={playlistName} track={track} />
        </div>
    );
}

export default Home;
