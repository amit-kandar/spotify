import React from 'react';
import PlaylistItem from '../PlaylistItem';

function Episodes({ list, path }) {
    return (
        <div>
            <div className='mb-2 px-4 flex items-baseline justify-between'>
                <h1 className='playlist-heading text-white text-lg font-bold'>Best episodes of the week</h1>
                <span className='show-all-btn text-[#a7a7a7]'>Show all</span>
            </div>
            <div className='w-full p-4 gap-[20px] overflow-x-scroll flex whitespace-nowrap scrollbar-hide scroll-smooth'>
                {
                    list.map(e =>
                        <PlaylistItem
                            key={e.id}
                            img_url={e.img_url}
                            title={e.title}
                            author={e.author}
                            path={path} />
                    )
                }
            </div>
        </div>
    )
}

export default Episodes;