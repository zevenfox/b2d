import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('user_name');
        if (storedUsername) {
            setUsername(storedUsername);
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogoClick = () => {
        navigate("/home");
    };

    const handleLogout = () => {
        localStorage.removeItem('user_name');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        setUsername(null);
        setIsLoggedIn(false);
        navigate('/index');
    };

    return (
        <nav className="w-full h-16 bg-[#0C1A2A] flex justify-between items-center px-8 md:px-16">
            <div className="text-[#A8FF35] text-xl font-bold cursor-pointer" onClick={handleLogoClick}>
                B2D <span className="text-white">venture</span>
            </div>

            <div className="flex space-x-6 text-white">
                {isLoggedIn ? (
                    <>
                        <span className="text-[#A8FF35]">Welcome, {username}</span>
                        <button onClick={handleLogout} className="hover:text-[red]">Sign Out</button>
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
