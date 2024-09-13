import React from 'react';
import StartUpCard from './components/StartUpCard';
import sort_icon from '../images/sort-icon.png';
import StickyNavbar from './components/Navbar';
import StickyFooter from './components/Footer';
import Colossal from './components/Colossal';

function AllStartUpPage() {
  return (
    <div>
    <StickyNavbar/>
      <div>
        <Colossal/>
      </div>
      <div className="bg-white text-black py-16">
        <div className="container mx-auto px-4 w-fit">
        <div className="text-center mb-8">
          <h1 className="text-[48px] font-bold ">All Startup Company</h1>
        </div>

        <div className="flex justify-between items-center mb-8">
        <button className="btn text-[#002244] px-4 py-2 rounded-full shadow-lg hover:bg-[#E0E0E0] transition duration-300">
            <span className="inline-flex items-center">
              <img src={sort_icon} alt="Sort Icon" className="mr-2" />
              Sort by
            </span>
          </button>
          <span className="text-[18px] text-gray-500">Found 123 startup company(s)</span>
          <span className="text-[18px] text-gray-500">page 1 - 10 pages</span>
        </div>
        <StartUpCard />
      </div>
    </div>
    <div>
        <StickyFooter/>
      </div>
    
    </div>
  );
}

export default AllStartUpPage;