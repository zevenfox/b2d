import React from "react";
import { X } from "lucide-react";

interface InvestProps {
    onClose: () => void;
}

const Invest: React.FC<InvestProps> = ({ onClose }) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
                <button className='text-gray-500 hover:text-gray-700 float-right'
                    onClick={onClose}>
                    <X />
                </button>
                <h2 className='text-2xl font-bold mb-4 text-center'>Invest Now</h2>
                <form>
                    <div className='mb-4'>
                        <label htmlFor="investmentamount" className='block text-sm font-medium text-gray-700'>
                            Investment Amount (USD)
                        </label>
                        <input
                            id="investmentamount"
                            name="investmentamount"
                            type="number"
                            required
                            placeholder="Enter Investment Amount (USD)"
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="reason" className='block text-sm font-medium text-gray-700'>
                            Share Your Reason
                        </label>
                        <textarea
                            id="reason"
                            name="reason"
                            required
                            placeholder="Share your reason"
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                    </div>

                    <button
                        type="submit"
                        className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
                        Invest
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Invest;
