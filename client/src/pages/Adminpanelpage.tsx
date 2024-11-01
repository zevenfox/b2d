import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StickyNavbar from './components/Navbar';
import StickyFooter from './components/Footer';

interface InvestmentRequest {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    investment_amount: number;
    reason: string;
    status: 'pending' | 'accepted' | 'declined';
}

const AdminPanel: React.FC = () => {
    const { user_id } = useParams<{ user_id: string }>(); // Retrieve user_id from URL
    const [investmentRequests, setInvestmentRequests] = useState<InvestmentRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInvestmentRequests = async () => {
        setLoading(true); // Set loading state
        try {
            const response = await axios.get(`http://localhost:3001/api/investment_requests/${user_id}`);
            const pendingRequests = response.data.investment_requests?.filter((request: InvestmentRequest) => request.status === 'pending') || [];

            if (pendingRequests.length > 0) {
                setInvestmentRequests(pendingRequests);
            } else {
                setInvestmentRequests([]); // Clear requests if no pending ones
            }
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

    const handleUpdateStatus = async (id: number, newStatus: 'accepted' | 'declined') => {
        try {
            await axios.put(`http://localhost:3001/api/investment_requests/${id}`, { status: newStatus });
            // Reload the investment requests
            fetchInvestmentRequests(); // Call the function to refresh the data
        } catch (err) {
            console.error('Error updating investment request:', err);
            setError('Failed to update investment request');
        }
    };

    return (
        <div>
            <StickyNavbar />
            <div className="min-h-screen bg-gray-100 p-10">
                <div className="container mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">{localStorage.getItem("user_name")}'s Investment Requests</h1>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {investmentRequests.length === 0 && !loading && <p>No investment requests available for this user.</p>}
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
                        {investmentRequests.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <span className="font-medium">{item.first_name} {item.last_name}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{item.email}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>${item.investment_amount}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{item.reason}</span>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-1"
                                        onClick={() => handleUpdateStatus(item.id, 'accepted')}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mb-1"
                                        onClick={() => handleUpdateStatus(item.id, 'declined')}
                                    >
                                        Decline
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <StickyFooter/>
        </div>
    );
};

export default AdminPanel;
