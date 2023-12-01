import React from 'react'
import { Link } from 'react-router-dom';

function PlaylistItem({ img_url, title, path }) {
    if (!img_url)
        img_url = "https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"

    return (
        <Link to={`${path}`} className='min-w-[160px] max-w-[160px] h-48 rounded-lg ml-2 hover:bg-neutral-800 p-2'>
            <div className='relative w-auto h-36'>
                <img
                    src={img_url}
                    alt="thumbnail"
                    className="w-full h-full rounded-lg"
                />
                {/* <Icon icon="bi:spotify" className='absolute top-2 left-2' /> */}
            </div>
            <h1 className='text-white text-lg pt-1'>{title}</h1>
        </Link>
    )
}

export default PlaylistItem;
