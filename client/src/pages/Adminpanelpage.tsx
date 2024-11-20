import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StickyNavbar from './components/Navbar';
import StickyFooter from './components/Footer';
import ConfirmationModal from './components/ConfirmationModal';

interface InvestmentRequest {
    id: number;
    startup_id: number;
    first_name: string;
    last_name: string;
    email: string;
    investment_amount: number;
    reason: string;
    status: 'pending' | 'accepted' | 'declined';
}

interface StartUp {
    id: number;
    startup_id: number;
    valuation_cap: number;
    funding_goal: number;
}

const AdminPanel: React.FC = () => {
    const { user_id } = useParams<{ user_id: string }>(); // Retrieve user_id from URL
    const [investmentRequests, setInvestmentRequests] = useState<InvestmentRequest[]>([]);
    const [startupResponse, setStartupResponse] = useState<StartUp | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
    const [actionType, setActionType] = useState<'accepted' | 'declined' | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const fetchInvestmentRequests = async () => {
        setLoading(true); // Set loading state
        try {
            const [investmentResponse, startupResponse] = await Promise.all([
                axios.get(`http://localhost:3001/api/investment_requests/${user_id}`),
                axios.get(`http://localhost:3001/api/startupsid/${user_id}`),
            ]);

            // Filter and sort investment requests
            const sortedRequests = investmentResponse.data.investment_requests
                ?.filter((request: InvestmentRequest) => ['pending', 'accepted', 'declined'].includes(request.status))
                .sort((a: InvestmentRequest, b: InvestmentRequest) => b.id - a.id); // Sort by ID (newest first)

            // Set both investment requests and startup details to state
            setInvestmentRequests(sortedRequests);
            setStartupResponse(startupResponse.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user_id) fetchInvestmentRequests();
    }, [user_id]);

    const handleOpenModal = (id: number, type: 'accepted' | 'declined') => {
        setSelectedRequestId(id);
        setActionType(type);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRequestId(null);
        setActionType(null);
    };

    const handleConfirm = async () => {
        if (selectedRequestId !== null && actionType) {
            try {
                await axios.put(`http://localhost:3001/api/investment_requests/${selectedRequestId}`, { status: actionType });
                fetchInvestmentRequests(); // Call the function to refresh the data
            } catch (err) {
                console.error('Error updating investment request:', err);
                setError('Failed to update investment request');
            } finally {
                handleCloseModal(); // Close modal after action
            }
        }
    };

    const getStatusLabel = (status: 'pending' | 'accepted' | 'declined') => {
        switch (status) {
            case 'pending':
                return 'Pending';
            case 'accepted':
                return 'Approved';
            case 'declined':
                return 'Declined';
            default:
                return '';
        }
    };

    const calculateFundingPercentage = () => {
        if (startupResponse?.valuation_cap && startupResponse?.funding_goal) {
            return (startupResponse.funding_goal / startupResponse.valuation_cap) * 100;
        }
        return 0;
    };

    return (
        <div>
            <StickyNavbar />
            <div className="min-h-screen bg-gray-100 p-10">
                <div className="container mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Progress</h1>
                    {/* Percentage Text */}
                    <div className="flex pb-10">
                        <div className="bg-[#0C1A2A] p-6 rounded-lg shadow-md flex justify-center items-center">
                            <span className="flex text-2xl text-white">
                                <h2 className="flex text-6xl font-bold text-[#A8FF35] pr-2">{calculateFundingPercentage().toFixed(0)}%</h2><div
                                className="flex pt-3.5">of<h2 className="flex font-bold text-[#A8FF35] px-2">Target</h2>achieved</div>
                            </span>
                        </div>
                    </div>
                    <div className="mb-8">
                        {/* Progress Bar Container */}
                        <div
                            className="relative bg-[#0C1A2A] p-8 rounded-lg shadow-lg flex items-center justify-between w-full"
                            style={{height: '80px'}}>
                            {/* Progress Filled Portion */}
                            <div
                                className="absolute top-0 left-0 h-full bg-[#A8FF35] rounded-l-lg"
                                style={{width: `${calculateFundingPercentage().toFixed(0)}%` }} // Dynamic width based on percentage
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            ></div>
                            {isHovered && (
                                <div
                                    className="ml-2 text-[#0C1A2A] font-extrabold text-4xl bg-[#A8FF35] px-4 py-2 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out"
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        marginLeft: '10px', // Space between the Target and tooltip
                                        transform: 'translateY(-50%)', // Center vertically with respect to the Target
                                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                                        zIndex: 10, // Ensure it's on top of other elements
                                    }}
                                >
                                    ${startupResponse?.funding_goal}
                                </div>
                            )}
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Investment Request(s)</h1>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="min-w-full bg-white border-collapse max-h-600px overflow-y-auto">
                        <table className="min-w-full bg-white border-collapse">
                            <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Investor Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Investment Amount</th>
                                <th className="py-3 px-6 text-left">Reason</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-700 text-sm font-light">
                            {investmentRequests.filter((item) => item.status === 'pending').length > 0 ? (
                                investmentRequests.filter((item) => item.status === 'pending').map((item, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <span className="font-medium">{item.first_name} {item.last_name}</span>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <a
                                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                {item.email}
                                            </a>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <span>${item.investment_amount}</span>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <span>{item.reason}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                                                    onClick={() => handleOpenModal(item.id, 'accepted')}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                                    onClick={() => handleOpenModal(item.id, 'declined')}
                                                >
                                                    Decline
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-3 px-6 text-center">
                                        <p className="text-gray-500">You have no upcoming requests</p>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="pt-20 pb-8">
                        <div className="h-px flex-auto bg-gray-100"></div>
                    </div>
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Approved Request(s)</h1>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="min-w-full bg-white border-collapse max-h-600px overflow-y-auto">
                        <table className="min-w-full bg-white border-collapse">
                            <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Investor Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Investment Amount</th>
                                <th className="py-3 px-6 text-left">Reason</th>
                                <th className="py-3 px-6 text-center">Status</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-700 text-sm font-light">
                            {investmentRequests.filter((item) => item.status === 'accepted').length > 0 ? (
                                investmentRequests.filter((item) => item.status === 'accepted').map((item, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <span className="font-medium">{item.first_name} {item.last_name}</span>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <a
                                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                {item.email}
                                            </a>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <span>${item.investment_amount}</span>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <span>{item.reason}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex justify-center space-x-2">
                                                    <span
                                                        className={`font-semibold ${
                                                            item.status === 'accepted'
                                                                ? 'text-green-500'
                                                                : item.status === 'declined'
                                                                    ? 'text-red-500'
                                                                    : 'text-yellow-500'
                                                        }`}
                                                    >
                                                        {getStatusLabel(item.status)}
                                                    </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-3 px-6 text-center">
                                        <p className="text-gray-500">You have not accepted any requests</p>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="pt-20 pb-8">
                        <div className="h-px flex-auto bg-gray-100"></div>
                    </div>
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Declined Request(s)</h1>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="min-w-full bg-white border-collapse max-h-600px overflow-y-auto">
                        <table className="min-w-full bg-white border-collapse">
                            <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Investor Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Investment Amount</th>
                                <th className="py-3 px-6 text-left">Reason</th>
                                <th className="py-3 px-6 text-center">Status</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-700 text-sm font-light">
                            {investmentRequests.filter((item) => item.status === 'declined').length > 0 ? (
                                investmentRequests.filter((item) => item.status === 'declined').map((item, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <span className="font-medium">{item.first_name} {item.last_name}</span>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <a
                                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                {item.email}
                                            </a>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <span>${item.investment_amount}</span>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <span>{item.reason}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex justify-center space-x-2">
                                                    <span
                                                        className={`font-semibold ${
                                                            item.status === 'accepted'
                                                                ? 'text-green-500'
                                                                : item.status === 'declined'
                                                                    ? 'text-red-500'
                                                                    : 'text-yellow-500'
                                                        }`}
                                                    >
                                                        {getStatusLabel(item.status)}
                                                    </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-3 px-6 text-center">
                                        <p className="text-gray-500">You have not accepted any requests</p>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <StickyFooter/>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
                actionType={actionType}
            />
        </div>
    );
};

export default AdminPanel;
