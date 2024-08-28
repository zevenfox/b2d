import React from 'react';
import StickyNavbar from './components/Navbar';
import StickyFooter from './components/Footer';
import Logo from '../images/arachax-logo.png';

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
            <StickyNavbar />
            <div className="min-h-screen bg-gray-800 p-10">
                {data.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p><strong>First name :</strong> {item.firstName}</p>
                                <p><strong>Last name :</strong> {item.lastName}</p>
                                <p><strong>Email :</strong> {item.email}</p>
                                <p><strong>Company_name :</strong> {item.companyName}</p>
                                <p><strong>Company_email :</strong> {item.companyEmail}</p>
                                <p><strong>Investment_amount :</strong> {item.investmentAmount}$</p>
                                <p><strong>Reason :</strong> {item.reason}</p>
                            </div>
                            <div className="flex items-start">
                                <img
                                    src={Logo} alt="Logo" className="size-16" />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2">Approve</button>
                            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Decline</button>
                        </div>
                    </div>
                ))}
            </div>
            <StickyFooter />
        </div>
    );
};

export default AdminPanel;
