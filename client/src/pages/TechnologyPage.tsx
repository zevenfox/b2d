import React from 'react';
import sort_icon from '../images/sort-icon.png';
import StickyNavbar from './components/Navbar';
import StickyFooter from './components/Footer';

import ai_logo from '../images/ai-logo.png';
import ai_bg from '../images/ai-bg.png';
import eagle_logo from '../images/eagle-logo.png';
import eagle_bg from '../images/eagle-bg.png';
import graph_logo from '../images/graph-logo.png';
import graph_bg from '../images/graph-bg.png';
import techno_logo from '../images/techno-logo.png';
import techno_bg from '../images/techno-bg.png';

function TechnologyStartUpPage() {
  const deals = [
    { id: 2, name: 'AI co., Ltd.', logo: ai_logo, background: ai_bg, description: 'AI Solutions at the best prices...', date: '12 Dec 23', raised: 32000, goal: 60000, percentRaised: 53, category: 'Technology' },
    { id: 3, name: 'Eagle co., Ltd.', logo: eagle_logo, background: eagle_bg, description: 'Secure transactions at high speed...', date: '10 Jan 24', raised: 18000, goal: 40000, percentRaised: 45, category: 'Technology' },
    { id: 6, name: 'Graph co., Ltd.', logo: graph_logo, background: graph_bg, description: 'Data analytics made simple In Graph we trust...', date: '18 Mar 24', raised: 29000, goal: 50000, percentRaised: 58, category: 'Technology' },
    { id: 8, name: 'Techno co., Ltd.', logo: techno_logo, background: techno_bg, description: 'Advanced technology solutions...', date: '30 May 24', raised: 27000, goal: 60000, percentRaised: 45, category: 'Technology' }
  ];

  return (
    <div>
      <StickyNavbar/>
      <div className="bg-white text-black py-16">
        <div className="container mx-auto px-4 w-fit">
          <div className="text-center mb-8">
            <h1 className="text-[48px] font-bold ">Technology</h1>
          </div>

          <div className="flex justify-between items-center mb-8">
            <button className="btn text-[#002244] px-4 py-2 rounded-full shadow-lg hover:bg-[#E0E0E0] transition duration-300">
              <span className="inline-flex items-center">
                <img src={sort_icon} alt="Sort Icon" className="mr-2" />
                Sort by
              </span>
            </button>
            <span className="text-[18px] text-gray-500">Found {deals.length} technology startup(s)</span>
            <span className="text-[18px] text-gray-500">page 1 - 1 pages</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {deals.map(deal => (
              <div
                key={deal.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Background Image */}
                <div className="relative h-[150px] transition-all duration-300">
                  <div
                    className="h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${deal.background})` }}
                  />
                  {/* Logo Positioned at the Bottom Middle */}
                  <div className="absolute -bottom-[30px] left-1/2 transform -translate-x-1/2">
                    <img
                      src={deal.logo}
                      alt={`${deal.name} logo`}
                      className="h-[60px] w-[60px] rounded-full bg-white p-1 shadow-md transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </div>
                {/* Deal Information */}
                <div className="p-6 pt-12">
                  <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold rounded-[10px] px-3 py-1 mb-4">
                    {deal.category}
                  </span>
                  <h2 className="text-xl font-semibold text-gray-800">{deal.name}</h2>
                  <p className="text-gray-600 my-4">{deal.description}</p>
                  <div className="mt-4">
                    <div className="text-gray-400">{deal.percentRaised}% raised of ${deal.goal / 1000}K goal</div>
                    <div className="h-2 bg-gray-700 mt-2 rounded-[10px]">
                      <div
                        className="h-full bg-[#C3FF73] rounded-[10px]"
                        style={{ width: `${deal.percentRaised}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-[12px] mt-4">{deal.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <StickyFooter/>
    </div>
  );
}

export default TechnologyStartUpPage;