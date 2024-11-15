import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AOS from 'aos'; // Import AOS for scroll animations
import 'aos/dist/aos.css'; // Import AOS styles
// import Stock from "../images/stock.png";
// import Partner from "../images/partner.png";
// import BarAnimation from "./components/AnimatedBars";
// import StickyFooter from "./components/Footer";
import moneytree from "../images/money-tree.png";

function PrehomePage() {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    // Initialize AOS on component mount
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            easing: 'ease-in-out',
            once: true // Animation only once per element
        });
        AOS.refresh();
    }, []);

    // Check user and redirect logic
    useEffect(() => {
        const userName = localStorage.getItem("user_name");
        if (userName) {
            const userRole = localStorage.getItem("role");
            if (userRole === "investor") {
                navigate("/home");
            } else if (userRole === "start_up") {
                const userId = localStorage.getItem("id");
                navigate(`/adminpanel/${userId}`);
            }
        }
    }, [navigate]);

    return (
        <div className='bg-white h-screen overflow-y-hidden relative'>
            <p className="text-[#A8FF35] text-xl font-bold absolute top-[30px] left-[30px] ">
                B2D <span className="text-black">venture</span>
            </p>
            <div className="relative">
                <div className="text-center pt-[100px]">
                    <h1 
                        className={`text-[64px] font-bold bg-black inline-block text-transparent bg-clip-text `}
                    >
                        Discover New Possibilities
                    </h1>
                    <p className="mb-[50px] max-w-2xl mx-auto text-black mt-[10px]">
                    Countless startups are ready for the right partner to help them soar. <br />
                    Don't miss your chance to invest in the next big success!
                    </p>
                </div>
                <div className="flex justify-center">
                <a
                    href="index"
                    className="inline-block px-[15px] py-[10px] text-white bg-black rounded-lg font-semibold transition duration-300 ease-in-out transform hover:bg-[#A8FF35] hover:text-black hover:scale-105 hover:shadow-xl"
                >
                    Get Started
                </a>
            </div>
            </div>
            <div className="flex">
                <img src={moneytree} alt="tree" className='w-[1500px] h-[666px] ml-auto mr-[350px]' />
            </div>
            {/* <div className="flex items-start text-white py-16" data-aos="fade-left">
                <div className="p-8 mx-auto">
                    <div className="flex items-start">
                        <div className="flex-1 pr-8 pl-16">
                            <h2 className="text-[58px] mb-8 text-black">
                                Partner with <span className="text-[#A8FF35]">Visionaries and Innovators</span>
                            </h2>
                            <p className="mb-[54px] text-[22px] text-black">
                                Join a dynamic network of startups and investors. Find your ideal partner and take your
                                business to new heights.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <img src={Partner} alt="Partner" className="animate-upDown size-fit pt-16" data-aos="zoom-in" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-start text-white pb-16" data-aos="fade-left">
                <div className="p-8 mx-auto">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <img src={Stock} alt="Stock" className="animate-upDown size-80 pt-16" data-aos="zoom-in" />
                        </div>
                        <div className="flex-1 pr-8 pl-16">
                            <h2 className="text-[58px] mb-8 text-black">
                                <span className="text-[#A8FF35]">Shape Your Future</span > with Strategic Investments
                            </h2>
                            <p className="mb-[54px] text-[22px] text-black">
                                Transforming the investment landscape with groundbreaking opportunities that empower
                                you to drive growth and achieve your financial goals.
                            </p>
                        </div>
                         */}
                    {/* </div>
                </div>
                
            </div> */}

            {/* <StickyFooter /> */}
        </div>
    );
}

export default PrehomePage;
