import React from "react";
import admin from "../../images/administrator.png";
import pending from "../../images/file.png";
import invest from "../../images/save-money.png";
import step1 from "../../images/circle-1-4.png";
import step2 from "../../images/circle-2-2.png";
import step3 from "../../images/circle-3.png";
import decision from "../../images/decision-making.png";
import register from "../../images/contract.png";

export default function HowToUse() {
  return (
    <div className="container mx-auto my-[80px] text-center text-white">
        <h2 className="text-[48px] font-bold mb-6">
          How to use <span className="text-[#C3FF73]">B2D</span> Venture?
        </h2>
      {/* Investor Section */}
      <div className="bg-[#1a1a1a] py-10 px-6 rounded-lg shadow-lg">
        <p className="text-[22px] mb-12 mx-auto max-w-[700px]">
          Our platform is designed to make investing in startups as easy as possible.
          Here's how you can get started as an <span className="text-[#C3FF73]">Investor</span>.
        </p>
        <div className="flex flex-col lg:flex-row justify-between items-center lg:space-x-20">
          <div className="flex flex-col items-center">
            <img src={step1} alt="Step 1" className="w-16 mb-8" />
            <img src={invest} alt="Invest" className="w-24 h-24 mb-8" />
            <p className="text-[18px] lg:text-[20px] text-center">
              Find your preferred startups and explore their unique offerings.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img src={step2} alt="Step 2" className="w-16 mb-8" />
            <img src={pending} alt="Pending" className="w-24 h-24 mb-8" />
            <p className="text-[18px] lg:text-[20px] text-center">
              Submit your investment and wait for approval by the startup.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img src={step3} alt="Step 3" className="w-16 mb-8" />
            <img src={admin} alt="Admin" className="w-24 h-24 mb-8" />
            <p className="text-[18px] lg:text-[20px] text-center">
              Our admin will reach out to confirm and finalize the deal.
            </p>
          </div>
        </div>
      </div>

      {/* Divider between sections */}
      {/* <hr className="my-16 border-t border-gray-600" /> */}

      {/* Startup Section */}
      <div className="bg-[#2c2c2c] py-10 px-6 rounded-lg shadow-lg">
        <p className="text-[22px] mb-12 mx-auto max-w-[700px]">
          Startups can easily find funding for their ventures. Here's how you can get started as a <span className="text-[#C3FF73]">Startup</span>.
        </p>
        <div className="flex flex-col lg:flex-row justify-between items-center lg:space-x-20">
          <div className="flex flex-col items-center">
            <img src={step1} alt="Step 1" className="w-16 mb-8" />
            <img src={register} alt="Register" className="w-24 h-24 mb-8" />
            <p className="text-[18px] lg:text-[20px] text-center">
              Register your startup and provide details about your business.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img src={step2} alt="Step 2" className="w-16 mb-8" />
            <img src={decision} alt="Decision" className="w-24 h-24 mb-8" />
            <p className="text-[18px] lg:text-[20px] text-center">
              Review investor offers and choose to approve or decline them.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img src={step3} alt="Step 3" className="w-16 mb-8" />
            <img src={admin} alt="Admin" className="w-24 h-24 mb-8" />
            <p className="text-[18px] lg:text-[20px] text-center">
              Our admin will reach out to confirm and finalize the deal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
