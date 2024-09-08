
import React from 'react';
import Logo from '../images/arachax-logo.png';
import StickyNavbar from './components/Navbar';
import StickyFooter from './components/Footer';

const AdminPanel: React.FC = () => {
    const data = [
        {
            firstName: "Kool",
            lastName: "Rawat",
            email: "technologysmitelol@gmail.com",
            companyName: "technologysmite",
            companyEmail: "Technologysmitelol@gmail.com",
            investmentAmount: 500,
            reason: "Book Hotels at Lowest Prices — We Have Over 40 Payment Ways for Locking the Lowest Room Rates. No Credit Card Needed! Read Reviews from Verified Guests provides a one-stop video solution covering video-on-demand, live streaming, real-time video calls."
        },
        {
            firstName: "Jane",
            lastName: "Doe",
            email: "janedoe@example.com",
            companyName: "ExampleCorp",
            companyEmail: "contact@examplecorp.com",
            investmentAmount: 1000,
            reason: "Expanding our product line to include new eco-friendly options, we are seeking investment to enhance our manufacturing capabilities and reduce our carbon footprint."
        },
        {
            firstName: "John",
            lastName: "Smith",
            email: "johnsmith@example.com",
            companyName: "Innovatech",
            companyEmail: "info@innovatech.com",
            investmentAmount: 750,
            reason: "Developing cutting-edge AI solutions for the healthcare industry. This investment will help us scale our operations and enter new markets."
        },
    ];

    return (
        <div>
            <StickyNavbar/>
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="container mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Panel - Investment Requests</h1>
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Investor Name</th>
                            <th className="py-3 px-6 text-left">Company</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Investment Amount</th>
                            <th className="py-3 px-6 text-left">Reason</th>
                            {/* <th className="py-3 px-6 text-center">Logo</th> */}
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm font-light">
                        {data.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <span className="font-medium">{item.firstName} {item.lastName}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{item.companyName}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{item.email}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>${item.investmentAmount}</span>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <span>{item.reason}</span>
                                </td>
                                {/* <td className="py-3 px-6 text-center">
                                    <img src={Logo} alt="Logo" className="h-12 w-12 mx-auto" />
                                </td> */}
                                <td className="py-3 px-6 text-center">
                                    <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mb-1">Approve</button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mb-1">Decline</button>
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


