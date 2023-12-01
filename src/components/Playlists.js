import React from 'react'
import RecentlyPlayed from './Playlist_Types/RecentlyPlayed';
import HitsDifferent from './Playlist_Types/Hits_Different';
import Episodes from './Playlist_Types/Episodes';
import Charts from './Playlist_Types/Charts';
import Radio from './Playlist_Types/Radio';
import PopularAlbum from './Playlist_Types/PopularAlbum';
import PopularArtists from './Playlist_Types/PopularArtists';
import IndiasBest from './Playlist_Types/IndiasBest';

function Playlist({ list }) {
    return (
        <div className='w-full'>
            {/* Recently Played */}
            <div className='my-4'>
                <RecentlyPlayed list={list} path='/playlist' />
            </div>

            {/* Hits Different */}
            <div className='my-4'>
                <HitsDifferent list={list} path="/playlist" />
            </div>

            {/* Episodes */}
            <div className='my-4'>
                <Episodes list={list} path="/episodes" />
            </div>

            {/* charts */}
            <div className='my-4'>
                <Charts list={list} path="/playlist" />
            </div>

            {/* Radio */}
            <div className='my-4'>
                <Radio list={list} path="/playlist" />
            </div>

            {/* Popular Album */}
            <div className='my-4'>
                <PopularAlbum list={list} path="/album" />
            </div>

            {/* Popular Artists */}
            <div className='my-4'>
                <PopularArtists list={list} path="/artist" />
            </div>

            {/* India's Best */}
            <div className='my-4'>
                <IndiasBest list={list} path="/playlist" />
            </div>
        </div>
    )
}

export default Playlist;