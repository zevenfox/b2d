import React from 'react';
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/home");
    };
  return (
    <nav className="w-full h-16 bg-[#0C1A2A] flex justify-between items-center px-8 md:px-16">
      {/* Logo Section */}
      <div className="text-[#A8FF35] text-xl font-bold cursor-pointer" onClick={handleLogoClick}>
        B2D <span className="text-white">venture</span>
      </div>

      {/* Menu Section */}
      <div className="flex space-x-6 text-white">
        <button className="hover:text-[#A8FF35]">Register as Start up</button>
        <button className="hover:text-[#A8FF35]">Login</button>
        <button className="px-4 py-2 border border-white rounded-full hover:border-[#A8FF35] hover:text-[#A8FF35]">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;