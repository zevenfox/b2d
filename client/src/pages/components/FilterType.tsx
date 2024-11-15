import React, { useState } from 'react';
// import civil from '../../images/civil-engineering.png';
import civil from '../../images/architecture.png';
import civil_black from '../../images/architecture-2.png';
// import cosmetic from '../../images/makeup.png';
import cosmetic from '../../images/cosmetics.png';
import cosmetic_black from '../../images/cosmetics-2.png';
// import lifestyle from '../../images/lifestyle-6.png';
import lifestyle from '../../images/needs.png';
import lifestyle_black from '../../images/needs-2.png';
// import technology from '../../images/computer.png';
import technology from '../../images/data-management.png';
import technology_black from '../../images/data-management-2.png';
// import art from '../../images/graphic-design.png';
import art from '../../images/paint-palette.png';
import art_black from '../../images/paint-palette-2.png';
import {useNavigate} from "react-router-dom";



const filters = [
  { id: 1, name: 'Lifestyle', icon: lifestyle, hoverIcon: lifestyle_black },
  { id: 2, name: 'Cosmetic', icon: cosmetic, hoverIcon: cosmetic_black },
  { id: 3, name: 'Technology', icon: technology, hoverIcon: technology_black },
  { id: 4, name: 'Architect and Engineer', icon: civil, hoverIcon: civil_black },
  { id: 5, name: 'Art and Design', icon: art, hoverIcon: art_black }
];

function FilterType({ onFilter }: { onFilter: (filter: string) => void }) {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [hoveredFilter, setHoveredFilter] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleFilterClick = (filterName: string) => {
    setSelectedFilter(filterName);
    onFilter(filterName);

    if (filterName === 'Technology') {
        navigate('/technologystartup');
        window.scrollTo(0, 0);
    }

    else if (filterName === 'Lifestyle') {
        navigate('/lifestylestartup');
        window.scrollTo(0, 0);
    }

    else if (filterName === 'Cosmetic') {
        navigate('/cosmeticstartup');
        window.scrollTo(0, 0);
    }

    else if (filterName === 'Architect and Engineer') {
        navigate('/architecturestartup');
        window.scrollTo(0, 0);
    }

    else if (filterName === 'Art and Design') {
        navigate('/artstartup');
        window.scrollTo(0, 0);
    }
  };

  return (
    <div className="bg-black w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {filters.map((filter) => (
          <div
            key={filter.id}
            onClick={() => handleFilterClick(filter.name)}
            onMouseEnter={() => setHoveredFilter(filter.id)}
            onMouseLeave={() => setHoveredFilter(null)}
            className={`text-white cursor-pointer flex items-center p-4 rounded-lg transition-transform transform hover:bg-[#A8FF35] hover:text-black hover:scale-105 hover:shadow-xl hover:z-20 hover:text-black gap-[10px] items-center justify-center ${
              selectedFilter === filter.name ? 'bg-gray-100 ' : 'bg-black '
            }`}
          >
            <img src={hoveredFilter === filter.id ? filter.hoverIcon : filter.icon} alt={filter.name} className='w-[36px]' />
            <p>{filter.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterType;
