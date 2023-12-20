import React from 'react'
import { Link } from 'react-router-dom';

import PlayBtnIcon from '../utils/img/png/play-btn-icon.png';

export default function PlaylistItem({ img_url, title, author, path }) {
    if (!img_url)
        img_url = "https://images.assetsdelivery.com/compings_v2/yehorlisnyi/yehorlisnyi2104/yehorlisnyi210400016.jpg"

    return (
        <Link to={`${path}`} className='item-play-card min-w-[160px] max-w-[160px] h-60 rounded-lg bg-[#161616] hover:bg-neutral-800 p-3 card-shadow transition duration-300 ease-in-out'>
            <div className='relative w-auto mb-2 img-shadow h-36'>
                <img
                    src={img_url}
                    alt="thumbnail"
                    className="w-full h-full rounded-lg object-cover"
                />
                <button className="item-play-btn w-[45px] relative">
                    <img src={PlayBtnIcon} alt="play-btn-icon/png" />
                </button>
                {/* <Icon icon="bi:spotify" className='absolute top-2 left-2' /> */}
            </div>
            <h1 className='item-title text-white text-lg pt-1'>{title}</h1>
            <p className='item-author text-[#777] truncate'>
                {author}
            </p>
        </Link>
    );
};