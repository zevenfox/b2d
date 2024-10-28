import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface FormData {
    username: string;
    password: string;
    confirmPassword: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}

const FormField: React.FC<{
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    hasError?: boolean;
}> = ({ label, name, type = "text", required = false, value, onChange, placeholder, hasError }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${hasError ? 'border-red-500' : 'border-gray-300'}`}
        />
        {hasError && name === 'confirmPassword' && (
            <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
        )}
    </div>
);

const InvestorSignUp: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        email: '',
        role: 'investor'
    });
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));

        // Check if passwords match when either password field changes
        if (name === 'password') {
            setPasswordsMatch(value === formData.confirmPassword);
        } else if (name === 'confirmPassword') {
            setPasswordsMatch(formData.password === value);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match.');
            setPasswordsMatch(false);
            return;
        }

        try {
            // Create a new object without the confirmPassword field
            const { confirmPassword, ...submitData } = formData;

            const response = await fetch('http://localhost:3001/api/register/investor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData), // Send data without confirmPassword
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Sign up failed');
            }

            toast.success('Sign up successful!');
            navigate('/home');
        } catch (error) {
            console.error('Error during sign up:', error);
            toast.error(error instanceof Error ? error.message : 'Sign up failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign Up as Investor
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormField
                            label="Username"
                            name="username"
                            required
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter your username"
                        />
                        <FormField
                            label="Password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                        />
                        <FormField
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm your password"
                            hasError={!passwordsMatch}
                        />
                        <FormField
                            label="First Name"
                            name="first_name"
                            required
                            value={formData.first_name}
                            onChange={handleInputChange}
                            placeholder="Enter your first name"
                        />
                        <FormField
                            label="Last Name"
                            name="last_name"
                            required
                            value={formData.last_name}
                            onChange={handleInputChange}
                            placeholder="Enter your last name"
                        />
                        <FormField
                            label="Email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                        />
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="w-full mr-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-full ml-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InvestorSignUp;