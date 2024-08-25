import React from 'react';
import StickyNavbar from './components/Navbar';
import Search from './components/Search';

function Homepage() {
  return (
    <div className="text-center text-red-600">
        <StickyNavbar />
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Unlock Success
        </h1>
        <h2 className="text-2xl mb-8">
          with the Right Business Partner
        </h2>
        <div className="max-w-2xl mx-auto mb-8">
          <Search placeholder="Search for startups..." onSearch={() => {}} />
        </div>
        <p className="mb-8 max-w-2xl mx-auto">
          Countless startups are ready for the right partner to help them soar.
          Don't miss your chance to invest in the next big success!
        </p>
        <button className="bg-gradient-to-r from-cyan-500 to-red-500 hover:from-cyan-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded-full">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Homepage;