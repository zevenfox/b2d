import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

interface InvestProps {
    onClose: () => void;
    startup_id: number;
    minInvestment?: number;
    maxInvestment?: number;
}

interface InvestmentFormData {
    investment_amount: number;
    reason: string;
    startup_id: number;
}

const Invest: React.FC<InvestProps> = ({ onClose, startup_id, minInvestment, maxInvestment }) => {
    const [investmentAmount, setInvestmentAmount] = useState<string>("");
    const [reason, setReason] = useState<string>("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [error, setError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInvestmentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setInvestmentAmount(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const amount = Number(investmentAmount);
        if (!amount || amount <= 0) {
            setError("Please enter a valid investment amount");
            return;
        }

        if (minInvestment && amount < minInvestment) {
            setError(`Minimum investment amount is $${minInvestment}`);
            return;
        }

        if (maxInvestment && amount > maxInvestment) {
            setError(`Maximum investment amount is $${maxInvestment}`);
            return;
        }

        if (!reason.trim()) {
            setError("Please provide a reason for your investment");
            return;
        }

        if (!agreeToTerms) {
            setError("You must agree to the investment terms before proceeding.");
            return;
        }

        const investmentData: InvestmentFormData = {
            investment_amount: amount,
            reason: reason.trim(),
            startup_id,
        };

        try {
            setIsSubmitting(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setError("User authentication is required to proceed.");
                return;
            }

            const response = await axios.post(
                'http://localhost:3001/api/invest',
                investmentData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                onClose();
                window.location.reload();
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "An error occurred while processing your investment");
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
                <button
                    className='text-gray-500 hover:text-gray-700 float-right'
                    onClick={onClose}
                    disabled={isSubmitting}
                >
                    <X />
                </button>
                <h2 className='text-2xl font-bold mb-4 text-center'>Invest Now</h2>

                {error && (
                    <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor="investmentamount" className='block text-sm font-medium text-gray-700'>
                            Investment Amount (USD)
                        </label>
                        <input
                            id="investmentamount"
                            name="investmentamount"
                            type="number"
                            required
                            value={investmentAmount}
                            onChange={handleInvestmentAmountChange}
                            placeholder="Enter Investment Amount (USD)"
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            disabled={isSubmitting}
                        />
                        {minInvestment && (
                            <p className="text-sm text-gray-500 mt-1">
                                Minimum investment: ${minInvestment}
                            </p>
                        )}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor="reason" className='block text-sm font-medium text-gray-700'>
                            Share Your Reason
                        </label>
                        <textarea
                            id="reason"
                            name="reason"
                            required
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Share your reason"
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="agreeToTerms"
                            checked={agreeToTerms}
                            onChange={(e) => setAgreeToTerms(e.target.checked)}
                            className="mr-2"
                            disabled={isSubmitting}
                        />
                        <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                            I agree to the{" "}
                            <a
                                href="/investment-agreement"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Investment Agreement
                            </a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !agreeToTerms}
                        className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300'>
                        {isSubmitting ? 'Processing...' : 'Invest'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Invest;
