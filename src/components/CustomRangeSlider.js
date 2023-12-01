import React from 'react';

const CustomRangeSlider = () => {
    const handleSliderChange = (event) => {
        // Add logic to handle slider change here
    };

    return (
        <div className="bg-f50 max-w-screen-lg mx-auto p-8">
            <h1 className="text-4b4949 text-center text-4xl mb-8">Custom CSS Range Slider</h1>
            <div className="bg-white rounded-lg p-4">
                {/* Range 1 */}
                <div className="range mb-4">
                    <input
                        type="range"
                        id="range1"
                        className="appearance-none w-full h-6 rounded-full bg-ccc"
                        style={{
                            backgroundImage: 'linear-gradient(to right, #f50 0%, #ccc 0%)',
                        }}
                    />
                </div>

                {/* Range 3 */}
                <div className="range mb-4">
                    <input
                        type="range"
                        id="range3"
                        className="appearance-none w-full h-6 rounded-full bg-ccc"
                        style={{
                            backgroundImage: 'linear-gradient(to right, #f50 0%, #ccc 0%)',
                        }}
                        onChange={handleSliderChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomRangeSlider;
