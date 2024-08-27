import React from 'react';

import arachax_logo from '../../images/arachax-logo.png';
import arachax_bg from '../../images/arachax-bg.png';
import ai_logo from '../../images/ai-logo.png';
import ai_bg from '../../images/ai-bg.png';
import eagle_logo from '../../images/eagle-logo.png';
import eagle_bg from '../../images/eagle-bg.png';
import glur_logo from '../../images/glur-logo.png';
import glur_bg from '../../images/glur-bg.png';

const deals = [
  { id: 1, name: 'Archax co., Ltd.', logo: arachax_logo, background: arachax_bg, description: 'Book Hotels at Lowest Prices. In Arachx we build a robot...', date: '15 Nov 23', raised: 25500, goal: 50000, percentRaised: 51, category: 'Architect and Engineer' },
  { id: 2, name: 'AI co., Ltd.', logo: ai_logo, background: ai_bg, description: 'AI Solutions at the best prices...', date: '12 Dec 23', raised: 32000, goal: 60000, percentRaised: 53, category: 'Technology' },
  { id: 3, name: 'Eagle co., Ltd.', logo: eagle_logo, background: eagle_bg, description: 'Secure transactions at high speed...', date: '10 Jan 24', raised: 18000, goal: 40000, percentRaised: 45, category: 'Technology' },
  { id: 4, name: 'Glur co., Ltd.', logo: glur_logo, background: glur_bg, description: 'Global communications and services...', date: '21 Jan 24', raised: 42000, goal: 70000, percentRaised: 60, category: 'Lifestyle' },
];

function StartUpCard() {
  return (
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
  );
}

export default StartUpCard;
