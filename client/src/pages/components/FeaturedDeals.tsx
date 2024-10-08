import React from 'react';
import StartUpCard from './StartUpCard';
import { useNavigate } from "react-router-dom";

interface FeaturedDealsProps {
  limit?: number;
}

function FeaturedDeals({ limit }: FeaturedDealsProps) {
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate("/allstartup");
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <h1 className="text-[48px] text-white font-bold mb-4">Featured Deals</h1>
      <p className="text-white text-[18px] mb-12">The deals that we recommend for you</p>
      <StartUpCard limit={limit} />
      <button 
        onClick={handleViewAllClick} 
        className="mt-12 bg-white text-gray-800 font-bold py-2 px-8 rounded-full hover:bg-gray-100 transition"
      >
        View All
      </button>
    </div>
  );
}

export default FeaturedDeals;
