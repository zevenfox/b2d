import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import Stock from "../images/stock.png";
import Partner from "../images/partner.png";
import BarAnimation from "./components/AnimatedBars";

function PrehomePage() {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    // Trigger fade up animation after the component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300); // Start animation after a small delay
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const userName = localStorage.getItem("user_name");
        if (userName) {
            // Redirect to home or admin panel based on user role
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
        <div>
            <div className="bg-white">
                <div className="relative bg-[#0C1A2A]">
                    <div className="text-center pt-16">
                        <h1 className={`text-[72px] font-bold bg-gradient-to-r from-[#8CB1FF] via-[#93FFFF] to-[#FFD6AD] inline-block text-transparent bg-clip-text ${isVisible ? 'fade-up-left-to-right' : 'opacity-0'}`}>
                            Discover New Possibilities
                        </h1>
                    </div>
                    <div className="w-full">
                        <BarAnimation/>
                    </div>
                </div>
                <div className="flex justify-center pt-16">
                    <a
                        href="index"
                        className="inline-block px-8 py-4 text-white bg-[#0C1A2A] rounded-lg text-[24px] font-semibold transition duration-300 ease-in-out transform hover:bg-[#A8FF35] hover:text-black hover:scale-105 hover:shadow-xl"
                    >
                        Get Started
                    </a>
                </div>
                <div className="flex items-start bg-white text-white py-16">
                    <div className="bg-[#0C1A2A] p-8 rounded-lg shadow-lg mx-auto max-w-6xl">
                        <div className="flex items-start">
                            <div className="flex-1 pr-8 pl-16">
                                <h2 className="text-[58px] mb-8">Partner with <h2 className="text-[#A8FF35]">Visionaries
                                    and Innovators</h2></h2>
                                <p className="mb-[54px] text-[22px]">
                                    Join a dynamic network of startups and investors. Find your ideal partner and take
                                    your
                                    business to new heights.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <img src={Partner} alt="Partner" className="animate-upDown size-fit pt-16"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-start bg-white text-white pb-16">
                    <div className="bg-[#0C1A2A] p-8 rounded-lg shadow-lg mx-auto max-w-6xl">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <img src={Stock} alt="Stock" className="animate-upDown size-80 pt-16"/>
                            </div>
                            <div className="flex-1 pr-8 pl-16">
                                <h2 className="text-[58px] mb-8"><h2 className="text-[#A8FF35]"> Shape Your
                                    Future</h2>with Strategic Investments
                                </h2>
                                <p className="mb-[54px] text-[22px]">
                                    Transforming the investment landscape with groundbreaking opportunities that empower
                                    you to drive growth and achieve your financial goals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrehomePage;
