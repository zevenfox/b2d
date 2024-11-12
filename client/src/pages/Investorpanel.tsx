import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StickyNavbar from './components/Navbar';
import StickyFooter from './components/Footer';
import ConfirmationModal from './components/ConfirmationModal';

interface InvestmentRequest {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    investment_amount: number;
    reason: string;
    status: 'pending' | 'accepted' | 'declined';
}

const InvestorPanel: React.FC = () => {
    const { user_id } = useParams<{ user_id: string }>(); // Retrieve user_id from URL
    const [investmentRequests, setInvestmentRequests] = useState<InvestmentRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
    const [actionType, setActionType] = useState<'accepted' | 'declined' | null>(null);


    const fetchInvestmentRequests = async () => {
        setLoading(true); // Set loading state
        try {
            const response = await axios.get(`http://localhost:3001/api/investorpanel_requests/${user_id}`);
            const sortedRequests = response.data.investment_requests
                ?.filter((request: InvestmentRequest) => ['pending', 'accepted', 'declined'].includes(request.status))
                .sort((a: InvestmentRequest, b: InvestmentRequest) => b.id - a.id) // Sort by ID (newest first)
                .slice(0, 20) || []; // Limit to 20 newest requests

            setInvestmentRequests(sortedRequests);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || 'Failed to fetch investment requests');
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

    return (
        <div>
            <StickyNavbar />
            <div className="min-h-screen bg-gray-100 p-10">
                <div className="container mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">My Investment Requests</h1>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <table className="min-w-full bg-white border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Startup Name</th>
                                <th className="py-3 px-6 text-left">Payment Contact</th>
                                <th className="py-3 px-6 text-left">Investment Amount</th>
                                <th className="py-3 px-6 text-left">Reason</th>
                                <th className="py-3 px-6 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm font-light">
                            {investmentRequests.length > 0 ? (
                                investmentRequests.map((item, index) => (
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
                                                <span className={`font-semibold ${
                                                    item.status === 'accepted' ? 'text-green-500' :
                                                        item.status === 'declined' ? 'text-red-500' : 'text-yellow-500'
                                                }`}>
                                                {getStatusLabel(item.status)}
                                            </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-3 px-6 text-center">
                                        <p className="text-gray-500">No investment requests available for you.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <StickyFooter />
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
                actionType={actionType}
            />
        </div>
    );
};

export default InvestorPanel;
