import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('user_name');
        const storedRole = localStorage.getItem('role');
        if (storedUsername) {
            setUsername(storedUsername);
            setIsLoggedIn(true);
            setRole(storedRole);
        }
    }, []);

    const handleLogoClick = () => {
        navigate("/home");
    };

    const handleLogout = () => {
        localStorage.removeItem('user_name');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        setUsername(null);
        setIsLoggedIn(false);
        setRole(null);
        navigate('/index');
    };

    return (
        <nav className="w-full h-[75px]  flex justify-between items-center px-8 md:px-16">
            <div className="text-[#BED754] text-xl font-bold cursor-pointer" onClick={handleLogoClick}>
                B2D <span className="text-black">venture</span>
            </div>
            {/* text-[#BED754] */}
            <div className="flex gap-[10px] text-black items-center">
                {isLoggedIn ? (
                    <>
                        <p className="mr-[10px]">Welcome, {username}</p>
                        {role === 'investor' && (
                            <button
                                onClick={() => navigate(`/investorpanel/${localStorage.getItem('id')}`)}
                                className="bg-black px-[15px] py-[5px] rounded-full text-white transition-transform transform hover:bg-[#A8FF35] hover:text-black hover:scale-105 hover:shadow-xl hover:z-20 hover:text-black"
                            >
                                My Investments
                            </button>
                        )}
                        {/* <span className="text-[#BED754] border border-[#BED754] px-[10px] py-[5px] rounded-full">Welcome, {username}</span> */}
                        <button onClick={handleLogout} className="hover:bg-red-600 hover:text-white hover:border-red-600 border border-black px-[15px] py-[5px] rounded-full">Sign Out</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate('/startupform')} className="hover:text-[#A8FF35]">Register as Start up</button>
                        <button onClick={() => navigate('/index')} className="hover:text-[#A8FF35]">Login</button>
                        <button onClick={() => navigate('/investorform')} className="px-4 py-2 border border-white rounded-full hover:border-[#A8FF35] hover:text-[#A8FF35]">Sign Up</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
