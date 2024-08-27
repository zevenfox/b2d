import React from "react";
import whyb2d from "../../images/whyb2d.png";

function WhyB2D() {
  return (
    <div className="container mx-auto my-[54px]">
      <h2 className="text-[48px] font-bold mb-4">
        Why <span className="text-[#C3FF73]">B2D</span> Venture?
      </h2>
      <div className="flex flex-col lg:flex-row items-start">
        <div className="">
          <p className="text-[18px] mb-12">
            Discover, engage, and invest with B2D Venture where innovation meets opportunity.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center text-[20px]">
              <span className="text-[#8CB1FF] text-[24px] mr-4">✅</span> Efficient Investment Process
            </li>
            <li className="flex items-center text-[20px]">
              <span className="text-[#8CB1FF] text-[24px] mr-4">✅</span> Access to Asian Markets
            </li>
            <li className="flex items-center text-[20px]">
              <span className="text-[#8CB1FF] text-[24px] mr-4">✅</span> Flexible Investment Sizes
            </li>
            <li className="flex items-center text-[20px]">
              <span className="text-[#8CB1FF] text-[24px] mr-4">✅</span> Networking Opportunities
            </li>
          </ul>
        </div>
        <div className="lg:w-1/2 mx-10">
          <img src={whyb2d} alt="Why B2D" className="max-w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default WhyB2D;