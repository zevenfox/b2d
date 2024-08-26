import React, { useState } from 'react';
import civil from '../../images/civil-engineering.png';
import cosmetic from '../../images/makeup.png';
import lifestyle from '../../images/lifestyle.png';
import technology from '../../images/computer.png';
import art from '../../images/graphic-design.png';


const filters = [
    { id: 1, name: 'Lifestyle', icon: lifestyle },
    { id: 2, name: 'Cosmetic', icon: cosmetic },
    { id: 3, name: 'Technology', icon: technology },
    { id: 4, name: 'Architect and Engineer', icon: civil },
    { id: 5, name: 'Art and Design', icon: art }
  ];

function FilterType({ onFilter }: { onFilter: (filter: string) => void }) {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleFilterClick = (filterName: string) => {
    setSelectedFilter(filterName);
    onFilter(filterName);
  };

  return (
    <div className="bg-white  py-8 px-4 rounded-xl shadow-lg max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {filters.map((filter) => (
          <div
            key={filter.id}
            onClick={() => handleFilterClick(filter.name)}
            className={`cursor-pointer flex flex-col items-center p-4 rounded-lg transition-transform transform hover:scale-105 ${
              selectedFilter === filter.name ? 'bg-gray-100 ' : 'bg-white '
            }`}
          >
            <img src={filter.icon} alt={filter.name} />
            <p className=" mt-4 text-lg font-semibold text-[#2C6292]">{filter.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterType;
