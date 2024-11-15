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
      <h1 className="text-[48px] font-bold mb-4">Featured Deals</h1>
      <p className="text-[18px] mb-12">The deals that we recommend for you</p>
      <StartUpCard limit={limit} />
      <button 
        onClick={handleViewAllClick} 
        className="mt-12 bg-black px-[15px] py-[10px] rounded-full text-white transition-transform transform hover:bg-[#A8FF35] hover:text-black hover:scale-105 hover:shadow-xl hover:z-20 hover:text-black"
      >
        View All
      </button>
    </div>
  );
}

export default FeaturedDeals;
