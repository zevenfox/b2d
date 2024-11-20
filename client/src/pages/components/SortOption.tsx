import React, { useState } from 'react';
import sort_icon from '../../images/sort-icon.png';

interface SortDropdownProps {
    sortOption: string;
    setSortOption: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sortOption, setSortOption }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSortSelection = (value: string) => {
        setSortOption(value);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Sort Button */}
            <button
                className="btn text-[#002244] px-4 py-2 rounded-full shadow-lg hover:bg-[#E0E0E0] transition duration-300"
                onClick={toggleDropdown}
            >
        <span className="inline-flex items-center">
          <img src={sort_icon} alt="Sort Icon" className="mr-2" />
          Sort by
        </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <ul className="py-2">
                        <li
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-200 transition ${
                                sortOption === 'newest' ? 'bg-gray-100 font-bold' : ''
                            }`}
                            onClick={() => handleSortSelection('newest')}
                        >
                            Newest
                        </li>
                        <li
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-200 transition ${
                                sortOption === 'latest' ? 'bg-gray-100 font-bold' : ''
                            }`}
                            onClick={() => handleSortSelection('closing')}
                        >
                            Closing soon
                        </li>
                        <li
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-200 transition ${
                                sortOption === 'alphabet' ? 'bg-gray-100 font-bold' : ''
                            }`}
                            onClick={() => handleSortSelection('alphabet')}
                        >
                            Alphabet
                        </li>
                        <li
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-200 transition ${
                                sortOption === 'reverse-alphabet' ? 'bg-gray-100 font-bold' : ''
                            }`}
                            onClick={() => handleSortSelection('reverse-alphabet')}
                        >
                            Reverse Alphabet
                        </li>
                        <li
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-200 transition ${
                                sortOption === 'oldest' ? 'bg-gray-100 font-bold' : ''
                            }`}
                            onClick={() => handleSortSelection('oldest')}
                        >
                            Oldest
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SortDropdown;
