import React, { useState } from 'react';
import StickyNavbar from './components/Navbar';
import Search from './components/Search';
import FilterType from './components/FilterType';

function Homepage() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
    console.log(`Selected filter: ${filter}`);
  };

  return (
    <div className="text-center text-white">
      <StickyNavbar />
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-[72px] font-bold mb-4 bg-gradient-to-r from-[#8CB1FF] from-20% via-[#93FFFF] from-30% via-61% to-[#FFD6AD] to-74% inline-block text-transparent bg-clip-text">
          Unlock Success
        </h1>
        <h2 className="text-[58px]">with the Right Business Partner</h2>
        <div className="max-w-2xl mx-auto my-[54px]">
          <Search placeholder="Search for startups..." onSearch={() => {}} />
        </div>
        <p className="mb-[54px] max-w-2xl mx-auto text-[22px]">
          Countless startups are ready for the right partner to help them soar.
          Don't miss your chance to invest in the next big success!
        </p>

        <FilterType onFilter={handleFilter} />

      </div>
    </div>
  );
}

export default Homepage;
