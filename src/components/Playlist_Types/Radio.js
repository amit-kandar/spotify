import React from 'react';
import PlaylistItem from '../PlaylistItem';

function Radio({ list, path }) {
    return (
        <div>
            <div className='mb-2 pl-4'>
                <h1 className='text-white text-lg font-bold'>Popular radio</h1>
            </div>
            <div className='w-full overflow-x-scroll flex whitespace-nowrap scrollbar-hide scroll-smooth'>
                {
                    list.map(e => {
                        return <PlaylistItem key={e.id} img_url={e.img_url} title={e.title} path={path} />
                    })
                }
            </div>
        </div>
    )
}

export default Radio;