import React, { useEffect, useState } from "react";
import axios from "axios";
import StickyNavbar from './components/Navbar';
import StickyFooter from './components/Footer';
import { useParams } from "react-router-dom";
import Invest from './components/Invest';

interface StartUp {
    id: number;
    user_id: number;
    valuation_cap: number;
    funding_goal: number;
    min_investment: number;
    max_investment: number;
    deadline: string;
    opportunity: string;
    opportunity_image: string;
    product: string;
    product_image: string;
    business_model: string;
    business_model_image: string;
    company_name: string;
    company_description: string;
    company_logo: string;
    company_background: string;
    company_business_type: 'lifestyle' | 'cosmetics' | 'technology' | 'architecture' | 'arts';
    company_email: string;
    company_website: string;
    company_telephone: string;
    company_address: string;
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

const StartupPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [startup, setStartup] = useState<StartUp | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isInvestPopupOpen, setIsInvestPopupOpen] = useState<boolean>(false);  // Popup state

    useEffect(() => {
        const fetchStartup = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3001/api/startups/${id}`);
                const data: StartUp = response.data;
                setStartup(data);
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

        fetchStartup();
    }, [id]);

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
        return <div>Error: {error}</div>;
    }

    if (!startup) {
        return <div>No startup found</div>;
    }

    const fundingPercentage = Math.min(100, (startup.funding_goal / startup.valuation_cap) * 100);

    return (
        <div className="text-left bg-white">
            <StickyNavbar />
            <header className="mx-auto px-56 py-16 text-left">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <img src={startup.company_logo} alt="Logo" className="size-16" />
                    </div>
                    <div className="flex-grow ml-8">
                        <h1 className="text-6xl font-bold">{startup.company_name}</h1>
                    </div>
                </div>
                <p className="text-xl text-black mt-4">{startup.company_description}</p>
            </header>
            <div className="mx-auto px-56 text-left">
                <div className="flex items-start">
                    <div className="flex-grow">
                        <img src={`http://localhost:3000${startup.opportunity_image}`} alt="Highlight" className="w-full" />
                    </div>
                    <div className="flex-none ml-16">
                        <div className="bg-black text-white p-6 rounded-md w-72">
                            <div className="text-3xl font-bold text-[#C3FF73]">{startup.valuation_cap}</div>
                            <div>Valuation Cap</div>
                            <div className="mt-4">
                                <div className="text-4xl font-bold text-[#C3FF73]">${startup.funding_goal}</div>
                                <div>{fundingPercentage.toFixed(0)}% raised of ${startup.valuation_cap} goal</div>
                                <div className="h-2 bg-gray-700 mt-2 rounded-[10px]">
                                    <div className="h-full bg-[#C3FF73] rounded-[10px]" style={{ width: `${fundingPercentage}%` }}></div>
                                </div>
                            </div>
                            <div className="text-3xl mt-6 font-bold text-[#C3FF73]">
                                {Math.ceil((new Date(startup.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                            </div>
                            <div>Left to invest</div>
                            <button
                                className="mt-6 bg-[#C3FF73] text-black w-full py-2 font-bold rounded"
                                onClick={() => setIsInvestPopupOpen(true)}  // Open popup on click
                            >
                                Invest in {startup.company_name}
                            </button>
                            <div className="mt-4 text-center">${startup.min_investment} minimum investment</div>
                        </div>
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="flex-grow">
                        <h1 className="text-3xl font-bold pt-24">Highlights</h1>
                        <p className="mt-4 text-black text-xl">
                            {startup.company_background}
                        </p>
                        <div className="pt-32">
                            <div className="h-px flex-auto bg-gray-300"></div>
                        </div>
                    </div>
                    <div className="flex-none ml-16">
                        <div className="bg-black text-lime-400 p-6 rounded-md w-72 mt-8">
                            <div className="mb-6">
                                <div className="text-xl font-bold text-[#C3FF73]">Valuation cap</div>
                                <div className="text-white">${startup.valuation_cap}</div>
                            </div>
                            <div className="h-px bg-gray-500"></div>
                            <div className="my-6">
                                <div className="text-xl font-bold text-[#C3FF73]">Funding goal</div>
                                <div className="text-white">${startup.funding_goal} / ${startup.valuation_cap}</div>
                            </div>
                            <div className="h-px bg-gray-500"></div>
                            <div className="my-6">
                                <div className="text-xl font-bold text-[#C3FF73]">Min & Max investment</div>
                                <div className="text-white">${startup.min_investment} to ${startup.max_investment}</div>
                            </div>
                            <div className="h-px bg-gray-500"></div>
                            <div className="mt-6">
                                <div className="text-xl font-bold text-[#C3FF73]">Deadline</div>
                                <div className="text-white">{new Date(startup.deadline).toLocaleDateString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-auto px-56 text-left">
                <h1 className="text-3xl font-bold pt-16">Opportunity</h1>
                <div className="size-4/5">
                    <p className="mt-4 text-black text-xl">{startup.opportunity}</p>
                    <div className="pt-16">
                        <div className="h-px flex-auto bg-gray-300"></div>
                    </div>
                </div>
            </div>
            <div className="mx-auto px-56 text-left">
                <h1 className="text-3xl font-bold pt-16">Product</h1>
                <img src={startup.product_image} alt="Product" className="size-4/5 pt-16" />
                <p className="mt-4 text-black text-xl pt-16">{startup.product}</p>
                <div className="pt-16">
                    <div className="h-px flex-auto bg-gray-300"></div>
                </div>
            </div>
            <div className="mx-auto px-56 text-left">
                <h1 className="text-3xl font-bold pt-16">Business Model</h1>
                <img src={startup.business_model_image} alt="Business Model" className="size-4/5 pt-16" />
                <p className="mt-4 text-black text-xl pt-16">{startup.business_model}</p>
                <div className="pt-16">
                    <div className="h-px flex-auto bg-gray-300"></div>
                </div>
            </div>
            <div className="mx-auto px-56 text-left">
                <h1 className="text-3xl font-bold pt-16">Company Info</h1>
                <p className="mt-4 text-black text-xl pb-16">{startup.company_description}</p>
            </div>
            {isInvestPopupOpen && (
                <Invest onClose={() => setIsInvestPopupOpen(false)} />
            )}
            <StickyFooter />
        </div>
    );
};

export default StartupPage;
