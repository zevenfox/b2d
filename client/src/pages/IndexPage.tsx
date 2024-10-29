import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface LoginData {
    username: string;
    password: string;
}

const Index: React.FC = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<LoginData>({ username: '', password: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Login successful!');
                localStorage.setItem('token', data.token); // Save the token for authentication
                localStorage.setItem('role', data.role); // Save the user's role
                localStorage.setItem('user_name', data.username);
                
                //TODO: Navigate based on the user role when ready
                if (data.role === 'investor') {
                    navigate('/home');
                } else if (data.role === 'start_up') {
                    navigate('/adminpanel');
                } else {
                    navigate('/'); // Default navigation if role is not set
                }
            } else {
                toast.error(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Error logging in');
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            <div className="w-1/2 p-10 flex items-center justify-center">
                <div className="w-[350px] bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                        <p className="text-gray-600 mb-6">Sign in to your account</p>
                        <form onSubmit={handleLogin}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={loginData.username}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={loginData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50">
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="w-1/2 p-10 flex flex-col items-center justify-center bg-gray-200">
                <h2 className="text-2xl font-bold mb-8">Join Us</h2>
                <div className="space-y-6 w-full max-w-[350px]">
                    <button
                        onClick={() => navigate('/investorform')}
                        className="w-full py-6 text-lg border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign Up as Investor
                    </button>
                    <button
                        onClick={() => navigate('/startupform')}
                        className="w-full py-6 text-lg border border-gray-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign Up as Startup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Index;
