import React, { useRef, useEffect, useState } from 'react';

const TruncateText = ({ text }) => {
    const pRef = useRef(null);
    const [isOverflown, setIsOverflown] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            const pElement = pRef.current;
            if (pElement) {
                setIsOverflown(pElement.offsetWidth < pElement.scrollWidth);
            }
        };

        checkOverflow();
        const resizeListener = () => checkOverflow();
        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    const truncateText = (text) => {
        if (isOverflown) {
            const words = text.split(' ');
            let truncatedText = '';
            for (const word of words) {
                if (truncatedText.length + word.length > 50) {
                    truncatedText += '...';
                    break;
                }
                truncatedText += ` ${word}`;
            }
            return truncatedText.trim();
        }
        return text;
    };

    return (
        <p ref={pRef} className='max-w-[364px] whitespace-nowrap overflow-hidden text-ellipsis'>
            {truncateText(text)}
        </p>
    );
};

export default TruncateText;