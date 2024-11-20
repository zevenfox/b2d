// import React from 'react';

// import arachax_logo from '../../images/arachax-logo.png';
// import arachax_bg from '../../images/arachax-bg.png';
// import ai_logo from '../../images/ai-logo.png';
// import ai_bg from '../../images/ai-bg.png';
// import eagle_logo from '../../images/eagle-logo.png';
// import eagle_bg from '../../images/eagle-bg.png';
// import glur_logo from '../../images/glur-logo.png';
// import glur_bg from '../../images/glur-bg.png';
// import agod_logo from '../../images/agod-logo.png';
// import agod_bg from '../../images/agod-bg.png';
// import graph_logo from '../../images/graph-logo.png';
// import graph_bg from '../../images/graph-bg.png';
// import rectangle_logo from '../../images/rectangle-logo.png';
// import rectangle_bg from '../../images/rectangle-bg.png';
// import techno_logo from '../../images/techno-logo.png';
// import techno_bg from '../../images/techno-bg.png';
// import {useNavigate} from "react-router-dom";

// const deals = [
//   { id: 1, name: 'Archax co., Ltd.', logo: arachax_logo, background: arachax_bg, description: 'Book Hotels at Lowest Prices. In Arachax we build a robot...', date: '15 Nov 23', raised: 25500, goal: 50000, percentRaised: 51, category: 'Architect and Engineer' },
//   { id: 2, name: 'AI co., Ltd.', logo: ai_logo, background: ai_bg, description: 'AI Solutions at the best prices...', date: '12 Dec 23', raised: 32000, goal: 60000, percentRaised: 53, category: 'Technology' },
//   { id: 3, name: 'Eagle co., Ltd.', logo: eagle_logo, background: eagle_bg, description: 'Secure transactions at high speed...', date: '10 Jan 24', raised: 18000, goal: 40000, percentRaised: 45, category: 'Technology' },
//   { id: 4, name: 'Glur co., Ltd.', logo: glur_logo, background: glur_bg, description: 'Global communications and services...', date: '21 Jan 24', raised: 42000, goal: 70000, percentRaised: 60, category: 'Lifestyle' },
//   { id: 5, name: 'Agod co., Ltd.', logo: agod_logo, background: agod_bg, description: 'Discover great deals for your stay...', date: '25 Feb 24', raised: 15000, goal: 30000, percentRaised: 50, category: 'Cosmetic' },
//   { id: 6, name: 'Graph co., Ltd.', logo: graph_logo, background: graph_bg, description: 'Data analytics made simple In Graph we trust......', date: '18 Mar 24', raised: 29000, goal: 50000, percentRaised: 58, category: 'Technology' },
//   { id: 7, name: 'Rectangle co., Ltd.', logo: rectangle_logo, background: rectangle_bg, description: 'Innovative architectural designs...', date: '28 Apr 24', raised: 10000, goal: 40000, percentRaised: 25, category: 'Architect and Engineer' },
//   { id: 8, name: 'Techno co., Ltd.', logo: techno_logo, background: techno_bg, description: 'Advanced technology solutions...', date: '30 May 24', raised: 27000, goal: 60000, percentRaised: 45, category: 'Technology' }
// ];

// interface StartUpCardProps {
//   limit?: number;
//   category?: string;
// }

// function StartUpCard({ limit, category }: StartUpCardProps) {
//   // Conditionally slice the array based on the limit prop
//   const displayedDeals = limit ? deals.slice(0, limit) : deals;
//   const navigate = useNavigate();
//   const handleCardClick = () => {
//     navigate("/startup");
//     window.scrollTo(0, 0);
//   };

//   return (
//     <div onClick={handleCardClick} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
//       {displayedDeals.map(deal => (
//         <div
//           key={deal.id}
//           className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
//         >
//           {/* Background Image */}
//           <div className="relative h-[150px] transition-all duration-300">
//             <div
//               className="h-full bg-cover bg-center"
//               style={{ backgroundImage: `url(${deal.background})` }}
//             />
//             {/* Logo Positioned at the Bottom Middle */}
//             <div className="absolute -bottom-[30px] left-1/2 transform -translate-x-1/2">
//               <img
//                 src={deal.logo}
//                 alt={`${deal.name} logo`}
//                 className="h-[60px] w-[60px] rounded-full bg-white p-1 shadow-md transition-transform duration-300 hover:scale-110"
//               />
//             </div>
//           </div>
//           {/* Deal Information */}
//           <div className="p-6 pt-12">
//             <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold rounded-[10px] px-3 py-1 mb-4">
//               {deal.category}
//             </span>
//             <h2 className="text-xl font-semibold text-gray-800">{deal.name}</h2>
//             <p className="text-gray-600 my-4">{deal.description}</p>
//             <div className="mt-4">
//               <div className="text-gray-400">{deal.percentRaised}% raised of ${deal.goal / 1000}K goal</div>
//               <div className="h-2 bg-gray-700 mt-2 rounded-[10px]">
//                 <div
//                   className="h-full bg-[#C3FF73] rounded-[10px]"
//                   style={{ width: `${deal.percentRaised}%` }}
//                 ></div>
//               </div>
//             </div>
//             <p className="text-gray-400 text-[12px] mt-4">{deal.date}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default StartUpCard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import featuredDeals from "./FeaturedDeals";

interface FeaturedDeal {
  id: number;
  company_name: string;
  company_logo: string;
  company_background: string;
  company_description: string;
  category: string;
  valuation_cap: number;
  funding_goal: number;
  raised: number;
  percentRaised: number;
  date: string;
  description: string;
}

interface StartUpCardProps {
  limit?: number;
}

function StartUpCard({ limit }: StartUpCardProps) {
  const [deals, setDeals] = useState<FeaturedDeal[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/featured-deals?limit=${limit}`);
        setDeals(response.data);
      } catch (error) {
        console.error("Error fetching featured deals:", error);
      }
    };

    fetchDeals();
  }, [limit]);

  const handleCardClick = (id: number) => {
    // Implement redirection when the startup page is ready
    // navigate(`/startup/${id}`);
    navigate(`/startups/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {deals.map(deal => (
        <div
          key={deal.id}
          onClick={() => handleCardClick(deal.id)}
          className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
        >
          {/* Background Image */}
          <div className="relative h-[150px] transition-all duration-300">
            <div
              className="h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${deal.company_background})` }}
            />
            {/* Logo Positioned at the Bottom Middle */}
            <div className="absolute -bottom-[30px] left-1/2 transform -translate-x-1/2">
              <img
                src={deal.company_logo}
                alt={`${deal.company_name} logo`}
                className="h-[60px] w-[60px] rounded-full bg-white p-1 shadow-md transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
          {/* Deal Information */}
          <div className="p-6 pt-12">
            <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold rounded-[10px] px-3 py-1 mb-4">
              {deal.category}
            </span>
            <h2 className="text-xl font-semibold text-gray-800">{deal.company_name}</h2>
            <p className="text-gray-600 my-4">{deal.company_description}</p>
            <div className="mt-4">
              <div className="text-gray-400">{Math.min(100, (deal.funding_goal / deal.valuation_cap) * 100).toFixed(0)}% raised of $
                {(deal.valuation_cap / 10000).toFixed(0)}K goal</div>
              <div className="h-2 bg-gray-700 mt-2 rounded-[10px]">
                <div
                  className="h-full bg-[#C3FF73] rounded-[10px]"
                  style={{ width: `${Math.min(100, (deal.funding_goal / deal.valuation_cap) * 100).toFixed(0)}%` }}
                ></div>
              </div>
            </div>
            <p className="text-gray-400 text-[12px] mt-4">
              {new Date(deal.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StartUpCard;
