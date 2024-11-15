import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface LoginData {
    username: string;
    password: string;
}

const Index: React.FC = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<LoginData>({ username: '', password: '' });
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    // Load remembered username on component mount
    useEffect(() => {
        const storedUsername = localStorage.getItem('rememberedUsername');
        if (storedUsername) {
            setLoginData(prev => ({ ...prev, username: storedUsername }));
            setRememberMe(true);
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.target.checked);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (rememberMe) {
            localStorage.setItem('rememberedUsername', loginData.username);
        } else {
            localStorage.removeItem('rememberedUsername');
        }

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
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                localStorage.setItem('user_name', data.username);
                localStorage.setItem('id', data.id);

                if (data.role === 'investor') {
                    navigate('/home');
                } else if (data.role === 'start_up') {
                    navigate(`/adminpanel/${localStorage.getItem('id')}`);
                } else {
                    navigate('/');
                }
            } else {
                toast.error(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Error logging in');
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password'); // Redirect to a forgot password page or open a modal
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
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={handleRememberMeChange}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                                    </div>
                                    <div className="text-sm">
                                    <button
                                        type="button"
                                        onClick={handleForgotPassword}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Forgot your password?
                                    </button>
                                </div>
                                </div>
                            </div>
                            <div className="py-4">
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
