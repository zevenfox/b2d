import React, { useState, useEffect } from 'react';
import ad1 from '../../images/ad1.png';
import ad2 from '../../images/ad2.png';
import ad3 from '../../images/ad3.png';


function ColossalAd() {
    const ads: string[] = [ad1, ad2, ad3]; // Define ads array as string[]
    const [currentAdIndex, setCurrentAdIndex] = useState<number>(0);
    const [isLocked, setIsLocked] = useState<boolean>(false);

    // Automatically change ad every 5 seconds unless locked
    useEffect(() => {
        if (!isLocked) {
            const interval = setInterval(() => {
                setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
            }, 5000); // Change interval (5 seconds)
            return () => clearInterval(interval); // Clear on unmount
        }
    }, [isLocked, currentAdIndex, ads.length]);

    // Handle button click to change ad and lock it
    const handleAdChange = (index: number) => {
        setCurrentAdIndex(index);
        setIsLocked(true); // Lock the ad when a button is clicked
    };

    return (
        <div className="relative w-full h-[250px] bg-gray-200">
            {/* Display Current Ad */}
            <img
                src={ads[currentAdIndex]}
                alt={`Ad ${currentAdIndex + 1}`}
                className="w-full h-full object-cover"
            />

            {/* Tracking buttons */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4">
                {ads.map((_, index: number) => (
                    <button
                        key={index}
                        onClick={() => handleAdChange(index)}
                        className={`w-4 h-4 rounded-full ${
                            currentAdIndex === index ? 'bg-[#A8FF35]' : 'bg-gray-500'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default ColossalAd;
