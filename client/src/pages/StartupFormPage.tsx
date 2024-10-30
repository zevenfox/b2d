import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

interface FormData {
    username: string;
    password: string;
    confirmPassword: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    valuation_cap: number;
    funding_goal: number;
    min_investment: number;
    max_investment: number;
    deadline: string;
    opportunity: string;
    opportunity_image: string | null;
    product: string;
    product_image: string | null;
    business_model: string;
    business_model_image: string | null;
    company_name: string;
    company_description: string;
    company_logo: string | null;
    company_background: string;
    company_business_type: string;
    company_email: string;
    company_website: string;
    company_telephone: string;
    company_address: string;
}

const FormField: React.FC<{
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    placeholder?: string;
    hasError?: boolean;
    min?: number | string;
}> = ({ label, name, type = "text", required = false, value, onChange, placeholder,hasError,min }) => (
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
            min={min}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {hasError && name === 'confirmPassword' && (
            <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
        )}
    </div>
);

const FileInput: React.FC<{
    label: string;
    name: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, required = false, onChange }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
            type="file"
            id={name}
            name={name}
            required={required}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
    </div>
);

const SelectField: React.FC<{
    label: string;
    name: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
}> = ({ label, name, required = false, value, onChange, options }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
            id={name}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
            <option value="" disabled>Select business type</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

const StartupSignUp: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        email: '',
        role: 'start_up',
        valuation_cap: 0,
        funding_goal: 0,
        min_investment: 0,
        max_investment: 0,
        deadline: '',
        opportunity: '',
        opportunity_image: null,
        product: '',
        product_image: null,
        business_model: '',
        business_model_image: null,
        company_name: '',
        company_description: '',
        company_logo: null,
        company_background: '',
        company_business_type: '',
        company_email: '',
        company_website: '',
        company_telephone: '',
        company_address: '',
    });
    const [passwordsMatch, setPasswordsMatch] = useState(true)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if ((name === 'company_telephone' || name === 'valuation_cap' || name === 'funding_goal' || name === 'min_investment' || name === 'max_investment') && !/^\d*$/.test(value)) {
            return; // If not a number, exit the function without updating state
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'number' ? Number(value) : value
        }));

        // Check if passwords match when either password field changes
        if (name === 'password') {
            setPasswordsMatch(value === formData.confirmPassword);
        } else if (name === 'confirmPassword') {
            setPasswordsMatch(formData.password === value);
        }

        if (type === 'number') {
            const parsedValue = parseInt(value, 10);
            if (parsedValue >= 0 || value === '') {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: parsedValue,
                }));
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData(prevState => ({ ...prevState, [name]: files[0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            formDataToSubmit.append(key, value);
        }

        try {
            // Create a new object without the confirmPassword field
            const { confirmPassword, ...submitData } = formData;

            const response = await axios.post('http://localhost:3001/api/register/startup', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Sign up successful!');
            navigate('/home');
        } catch (error) {
            console.error('Error signing up:', error);
            toast.error('Sign up failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <button
                type="button"
                onClick={() => navigate('/index')}
                className="absolute top-4 left-4 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Back
            </button>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign Up as Startup
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* User Information Section */}
                        <h3 className="text-lg font-medium text-gray-900">User Information</h3>
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

                        {/* Company Information Section */}
                        <h3 className="text-lg font-medium text-gray-900 pt-6">Company Information</h3>
                        <FormField
                            label="Company Name"
                            name="company_name"
                            required
                            value={formData.company_name}
                            onChange={handleInputChange}
                            placeholder="Enter company name"
                        />
                        <FileInput
                            label="Company Logo"
                            name="company_logo"
                            required
                            onChange={handleFileChange}
                        />
                        <FormField
                            label="Company Description"
                            name="company_description"
                            required
                            value={formData.company_description}
                            onChange={handleInputChange}
                            placeholder="Enter company description"
                        />
                        <FormField
                            label="Company Background"
                            name="company_background"
                            required
                            value={formData.company_background}
                            onChange={handleInputChange}
                            placeholder="Enter company background"
                        />
                        <SelectField
                            label="Company Business Type"
                            name="company_business_type"
                            required
                            value={formData.company_business_type}
                            onChange={handleInputChange}
                            options={[
                                { value: 'lifestyle', label: 'Lifestyle' },
                                { value: 'cosmetics', label: 'Cosmetics' },
                                { value: 'technology', label: 'Technology' },
                                { value: 'architecture', label: 'Architect and Engineer' },
                                { value: 'arts', label: 'Art and Design' },
                            ]}
                        />

                        {/* Business Details Section */}
                        <h3 className="text-lg font-medium text-gray-900 pt-6">Business Details</h3>
                        <FormField
                            label="Business Opportunity"
                            name="opportunity"
                            required
                            value={formData.opportunity}
                            onChange={handleInputChange}
                            placeholder="Enter business opportunity"
                        />
                        <FileInput
                            label="Opportunity Image"
                            name="opportunity_image"
                            onChange={handleFileChange}
                        />
                        <FormField
                            label="Product"
                            name="product"
                            required
                            value={formData.product}
                            onChange={handleInputChange}
                            placeholder="Enter product details"
                        />
                        <FileInput
                            label="Product Image"
                            name="product_image"
                            onChange={handleFileChange}
                        />
                        <FormField
                            label="Business Model"
                            name="business_model"
                            required
                            value={formData.business_model}
                            onChange={handleInputChange}
                            placeholder="Enter business model"
                        />
                        <FileInput
                            label="Business Model Image"
                            name="business_model_image"
                            onChange={handleFileChange}
                        />

                        {/* Investment Details Section */}
                        <h3 className="text-lg font-medium text-gray-900 pt-6">Investment Details</h3>
                        <FormField
                            label="Valuation Cap"
                            name="valuation_cap"
                            required
                            type="tel"
                            value={formData.valuation_cap}
                            onChange={handleInputChange}
                            placeholder="Enter valuation cap"
                            min={1}
                        />
                        <FormField
                            label="Funding Goal"
                            name="funding_goal"
                            required
                            type="tel"
                            value={formData.funding_goal}
                            onChange={handleInputChange}
                            placeholder="Enter funding goal"
                            min={1}
                        />
                        <FormField
                            label="Minimum Investment"
                            name="min_investment"
                            type="tel"
                            required
                            value={formData.min_investment}
                            onChange={handleInputChange}
                            placeholder="Enter minimum investment"
                            min={1}
                        />
                        <FormField
                            label="Maximum Investment"
                            name="max_investment"
                            type="tel"
                            required
                            value={formData.max_investment}
                            onChange={handleInputChange}
                            placeholder="Enter maximum investment"
                            min={1}
                        />
                        <FormField
                            label="Deadline"
                            name="deadline"
                            type="date"
                            required
                            value={formData.deadline}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split('T')[0]}
                        />

                        {/* Contact Information Section */}
                        <h3 className="text-lg font-medium text-gray-900 pt-6">Contact Information</h3>
                        <FormField
                            label="Company Website"
                            name="company_website"
                            required
                            value={formData.company_website}
                            onChange={handleInputChange}
                            placeholder="Enter company website"
                        />
                        <FormField
                            label="Company Email"
                            name="company_email"
                            type="email"
                            required
                            value={formData.company_email}
                            onChange={handleInputChange}
                            placeholder="Enter company email"
                        />
                        <FormField
                            label="Company Phone"
                            name="company_telephone"
                            required
                            type="tel"
                            value={formData.company_telephone}
                            onChange={handleInputChange}
                            placeholder="Enter company phone"
                        />
                        <FormField
                            label="Company Address"
                            name="company_address"
                            required
                            value={formData.company_address}
                            onChange={handleInputChange}
                            placeholder="Enter company address"
                        />

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => navigate('/index')}
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

export default StartupSignUp;