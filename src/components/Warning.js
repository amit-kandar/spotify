import React from 'react'

function Warning({ text }) {
    return (
        <div className='bg-amber-600 w-full rounded mt-4 p-4 flex flex-row gap-3 items-start'>
            <i className='bx bx-info-circle text-2xl'></i>
            <p className="text-sm text-black font-medium">
                {text}
            </p>
        </div>
    )
}

export default Warning