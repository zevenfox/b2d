import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import StickyNavbar from './components/Navbar';
import StickyFooter from './components/Footer';
import SortOption from "./components/SortOption";
import Colossal from "./components/Colossal";

interface StartUp {
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

const Skeleton: React.FC = () => (
    <div className="animate-pulse">
        <div className="flex items-start mb-6">
            <div className="h-16 w-16 bg-gray-300 rounded-full"></div>
            <div className="ml-8 flex-grow">
                <div className="h-8 w-64 bg-gray-300 mb-4"></div>
                <div className="h-4 w-32 bg-gray-300"></div>
            </div>
        </div>
        <div className="h-48 bg-gray-300 w-full mb-8"></div>
        <div className="flex">
            <div className="flex-grow h-8 w-32 bg-gray-300"></div>
            <div className="ml-8 flex-grow h-8 w-32 bg-gray-300"></div>
        </div>
    </div>
);

function AllStartUpPage() {
    const [startups, setStartups] = useState<StartUp[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState<string>('newest');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 12; // Define items per page
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllStartups = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3001/api/allstartups');
                setStartups(response.data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAllStartups();
    }, []);

    const sortStartups = (startups: StartUp[]) => {
        switch (sortOption) {
            case 'alphabet':
                return [...startups].sort((a, b) => a.company_name.localeCompare(b.company_name));
            case 'reverse-alphabet':
                return [...startups].sort((a, b) => b.company_name.localeCompare(a.company_name));
            case 'newest':
                return [...startups].sort((a, b) => (b.id - a.id));
            case 'closing':
                const twoWeeksFromNow = new Date();
                twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
                return [...startups]
                    .filter(startup => new Date(startup.date) <= twoWeeksFromNow)
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            case 'oldest':
                return [...startups].sort((a, b) => (a.id - b.id));
            default:
                return startups;
        }
    };

    const sortedStartups = sortStartups(startups);
    const totalPages = Math.ceil(sortedStartups.length / itemsPerPage);
    const currentStartups = sortedStartups.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    if (loading) {
        return (
            <div className="text-left bg-white">
                <StickyNavbar />
                <div className="mx-auto px-56 py-16 text-left">
                    <Skeleton />
                </div>
                <StickyFooter />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}. Please try again later.</div>;
    }

    return (
        <div>
            <StickyNavbar />
            <Colossal />
            <div className="bg-white text-black py-16">
                <div className="container mx-auto px-4 w-fit">
                    <div className="text-center mb-8">
                        <h1 className="text-[48px] font-bold">All Startups</h1>
                    </div>

                    {/* SortOption component */}
                    <div className="flex justify-between items-center mb-8">
                        <SortOption sortOption={sortOption} setSortOption={setSortOption} />
                        <span className="text-[18px] text-gray-500">Found {sortedStartups.length} startup(s)</span>
                        <span className="text-[18px] text-gray-500">Page {currentPage} of {totalPages}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {currentStartups.map(startup => (
                            <div
                                key={startup.id}
                                className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                                onClick={() => navigate(`/startups/${startup.id}`)}
                            >
                                <div className="relative h-[150px] transition-all duration-300">
                                    <div
                                        className="h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url(${startup.company_background})`, opacity: 0.3 }}
                                    />
                                    <div className="absolute -bottom-[30px] left-1/2 transform -translate-x-1/2">
                                        <img
                                            src={startup.company_logo}
                                            alt={`${startup.company_name} logo`}
                                            className="h-[60px] w-[60px] rounded-full bg-white p-1 shadow-md transition-transform duration-300 hover:scale-110"
                                        />
                                    </div>
                                </div>
                                <div className="p-6 pt-12">
                                    <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold rounded-[10px] px-3 py-1 mb-4">
                                        {startup.category}
                                    </span>
                                    <h2 className="text-xl font-semibold text-gray-800">{startup.company_name}</h2>
                                    <p className="text-gray-600 my-4">{startup.description}</p>
                                    <div className="mt-4">
                                        <div className="text-gray-400">{Math.min(100, (startup.funding_goal / startup.valuation_cap) * 100).toFixed(0)}% raised of ${(startup.valuation_cap / 1000).toFixed(0)}K goal</div>
                                        <div className="h-2 bg-gray-700 mt-2 rounded-[10px]">
                                            <div
                                                className="h-full bg-[#C3FF73] rounded-[10px]"
                                                style={{ width: `${Math.min(100, (startup.funding_goal / startup.valuation_cap) * 100).toFixed(0)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-[12px] mt-4">
                                        {new Date(startup.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between mt-8">
                        <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-black text-white px-4 py-2 rounded disabled:opacity-50">
                            Previous
                        </button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-black text-white px-4 py-2 rounded disabled:opacity-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <StickyFooter />
        </div>
    );
}

export default AllStartUpPage;
