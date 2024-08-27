import React from 'react';
import StartUpCard from './StartUpCard';


function FeaturedDeals() {
  return (
    <div>
      <h1 className="text-[48px] text-white font-bold mb-4">Featured Deals</h1>
      <p className="text-white text-[18px] mb-12">The deals that we recommend for you</p>
      <StartUpCard />
      <button className="mt-12 bg-white text-gray-800 font-bold py-2 px-8 rounded-full hover:bg-gray-100 transition">
        View All
      </button>
    </div>
  );
}

export default FeaturedDeals;
