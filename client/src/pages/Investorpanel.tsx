import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StickyNavbar from './components/Navbar';
import StickyFooter from './components/Footer';
import { Doughnut } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

interface InvestmentRequest {
    deal_id: number;
    id: number;
    startup_id: number;
    company_name: string;
    first_name: string;
    last_name: string;
    email: string;
    investment_amount: number;
    reason: string;
    status: 'pending' | 'accepted' | 'declined';
}

interface AggregatedInvestment {
    company_name: string;
    investment_amount: number;
}

const InvestorPanel: React.FC = () => {
    const {user_id} = useParams<{ user_id: string }>(); // Retrieve user_id from URL
    const [investmentRequests, setInvestmentRequests] = useState<InvestmentRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInvestmentRequests = async () => {
        setLoading(true); // Set loading state
        try {
            const response = await axios.get(`http://localhost:3001/api/investorpanel_requests/${user_id}`);
            const sortedRequests = response.data.investment_requests
                ?.filter((request: InvestmentRequest) => ['pending', 'accepted', 'declined'].includes(request.status))
                .sort((a: InvestmentRequest, b: InvestmentRequest) => b.deal_id - a.deal_id) // Sort by ID (newest first)

            setInvestmentRequests(sortedRequests);
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

    const approvedInvestments = investmentRequests.filter(request => request.status === 'accepted');

    // Aggregate investments for the same company
    const aggregatedInvestments = approvedInvestments.reduce((acc: Record<string, AggregatedInvestment>, request) => {
        const companyName = request.company_name;
        if (acc[companyName]) {
            acc[companyName].investment_amount += request.investment_amount;
        } else {
            acc[companyName] = {
                company_name: companyName,
                investment_amount: request.investment_amount,
            };
        }
        return acc;
    }, {});

    const combinedInvestments = Object.values(aggregatedInvestments);

    // Recalculate the total approved amount after combining
    const totalCombinedAmount = combinedInvestments.reduce((sum: number, investment: AggregatedInvestment) => sum + investment.investment_amount, 0);

    // Updated pieData with combined investments
    const pieData = {
        labels: combinedInvestments.map(investment => investment.company_name),
        datasets: [
            {
                data: combinedInvestments.map(
                    investment => (investment.investment_amount / totalCombinedAmount) * 100
                ),
                backgroundColor: combinedInvestments.map((_, index) => `hsl(${index * 360 / combinedInvestments.length}, 70%, 50%)`),
                hoverBackgroundColor: combinedInvestments.map((_, index) => `hsl(${index * 360 / combinedInvestments.length}, 80%, 60%)`),
            },
        ],
    };

    const pieOptions: ChartOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                position: 'nearest',
                callbacks: {
                    label: (context: any) => {
                        const companyName = context.label;
                        const percent = context.raw.toFixed(2); // Percent representation of investment
                        return `${percent}% of your total investment invested in ${companyName}`;
                    },
                },
                backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Darker background for better contrast
                titleFont: {size: 14, weight: 'bold'},  // Adjust font styles
                bodyFont: {size: 12},  // Smaller font size for body text
            },
            legend: {
                display: false,
                position: 'left',  // Position the legend on the left
                align: 'start',    // Align the legend items to the start (top)
                labels: {
                    padding: 40,  // Add padding between the legend items
                    boxWidth: 40,  // Adjust the box width of the legend item
                    usePointStyle: true,  // Use point style for better visual consistency
                    font: {
                        size: 12,  // Adjust font size of legend
                        weight: 'normal',
                        family: 'Arial, sans-serif',  // Adjust font family
                    },
                },
            },
            datalabels: {
                display: false,
                align: 'start',  // Align labels outside the chart
                anchor: 'end',   // Anchor labels to the end
                font: {
                    size: 12, // Font size for the labels
                    weight: 'bold',
                },
                color: '#000', // Color of the label text
                offset: 10, // Offset the labels from the edge of the doughnut
                clamp: false, // Allow labels to overflow outside the chart
            },
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,  // Padding on the top (adjustable)
                bottom: 20,
            },
        },
        maintainAspectRatio: false,  // Ensures responsiveness across different screen sizes
    };

    return (
        <div>
            <StickyNavbar/>
            <div className="min-h-screen bg-gray-100 p-10">
                <div className="container mx-auto bg-white rounded-lg shadow-lg p-8">
                    <div className="flex justify-between mb-10">
                        <div className="flex-1 px-4">
                            <h1 className="text-2xl font-bold mb-6 text-gray-800">My Investment Summary</h1>
                            {totalCombinedAmount > 0 ? (
                                <div className="flex justify-center items-center">
                                    <div className="w-full h-64">
                                        <Doughnut data={pieData} options={pieOptions}/>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500">You have no approved requests.</p>
                            )}
                        </div>
                        <div className="flex-1 px-4">
                            {combinedInvestments.length > 0 ? (
                                <h2 className="flex text-xl font-semibold text-gray-800 mb-4">
                                    You have invested a total of
                                    <span className="px-2 text-green-500">${totalCombinedAmount}</span>
                                    in {combinedInvestments.length}
                                    {combinedInvestments.length > 1 ? ' companies' : ' company'}.
                                </h2>
                            ) : (
                                <div></div>
                            )}
                            <div>
                                <div className="overflow-y-auto h-64">
                                    {combinedInvestments.length > 0 ? (
                                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow" style={{tableLayout: "fixed"}}>
                                            <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
                                            <tr>
                                                <th className="py-3 px-4 text-left">Company</th>
                                                <th className="py-3 px-4 text-left">Total Investment</th>
                                                <th className="py-3 px-4 text-left">Percentage</th>
                                            </tr>
                                            </thead>
                                            <tbody className="text-gray-700 text-sm font-light">
                                            {combinedInvestments.map((investment, index) => {
                                                const percentage = ((investment.investment_amount / totalCombinedAmount) * 100).toFixed(2);
                                                return (
                                                    <tr key={index}
                                                        className="border-b border-gray-200 hover:bg-gray-100">
                                                        <td className="py-3 px-4 text-left whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <span
                                                                    className="inline-block w-3 h-3 mr-2 rounded-full"
                                                                    style={{
                                                                        backgroundColor: `hsl(${index * 360 / combinedInvestments.length}, 70%, 50%)`
                                                                    }}
                                                                ></span>
                                                                <span>{investment.company_name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-4 text-left">
                                                            <span className="text-blue-500 font-semibold">
                                                                ${investment.investment_amount}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 text-left text-green-500 font-semibold">
                                                            <span>{percentage}%</span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Pending Request(s)</h1>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="min-w-full bg-white border-collapse max-h-600px overflow-y-auto">
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
                                investmentRequests
                                    .filter((item) => item.status === 'pending')
                                    .map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <a
                                                    href={`/startups/${item.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {item.company_name}
                                                </a>
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
                                        <p className="text-gray-500">No pending requests available</p>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="pt-20 pb-8">
                        <div className="h-px flex-auto bg-gray-100"></div>
                    </div>
                    {/* Approved Requests */}
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Approved Request(s) History</h1>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="min-w-full bg-white border-collapse max-h-600px overflow-y-auto">
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
                                investmentRequests
                                    .filter((item) => item.status === 'accepted')
                                    .map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <a
                                                    href={`/startups/${item.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {item.company_name}
                                                </a>
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
                                                    <span className="font-semibold text-green-500">
                                                        Accepted
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-3 px-6 text-center">
                                        <p className="text-gray-500">No approved requests available</p>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="pt-20 pb-8">
                        <div className="h-px flex-auto bg-gray-100"></div>
                    </div>
                    {/* Declined Requests */}
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Declined Request(s) History</h1>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="min-w-full bg-white border-collapse max-h-600px overflow-y-auto">
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
                                investmentRequests
                                    .filter((item) => item.status === 'declined')
                                    .map((item, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                                <a
                                                    href={`/startups/${item.id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    {item.company_name}
                                                </a>
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
                                                    <span className="font-semibold text-red-500">
                                                        Declined
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-3 px-6 text-center">
                                        <p className="text-gray-500">No declined requests available</p>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <StickyFooter/>
        </div>
    );
};

export default InvestorPanel;
