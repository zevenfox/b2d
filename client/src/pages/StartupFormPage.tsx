import React, { useState, ChangeEvent, FormEvent } from 'react';
import StickyNavbar from './components/Navbar';
import StickyFooter from './components/Footer';
import { useNavigate } from 'react-router-dom';


interface FormFieldw {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FormField: React.FC<FormFieldw> = ({ label, name, type = "text", required = false, placeholder, value, onChange }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {type === 'textarea' ? (
            <textarea
                id={name}
                name={name}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows={3}
            />
        ) : type === 'select' ? (
            <select
                id={name}
                name={name}
                required={required}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
                <option value="">Select business type</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="cosmetic">Cosmetic</option>
                <option value="technology">Technology</option>
                <option value="architect and engineer">Architect And Engineer</option>
                <option value="art and design">Art And Design</option>
            </select>
        ) : (
            <input
                type={type}
                id={name}
                name={name}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
        )}
    </div>
);

interface ImageUploadProps {
    label: string;
    name: string;
    required: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: File | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, name, required, onChange, value }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
            type="file"
            id={name}
            name={name}
            required={required}
            onChange={onChange}
            className="mt-1 block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-indigo-50 file:text-indigo-700
        hover:file:bg-indigo-100"
        />
        {value && (
            <img src={URL.createObjectURL(value)} alt={label} className="mt-2 h-20 w-20 object-cover rounded-md" />
        )}
    </div>
);

interface FormData {
    [key: string]: string | File | null;
}

const StartupSignUp: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        username: '', password: '', firstName: '', lastName: '', email: '',
        companyName: '', companyLogo: null, highlight: '', companyOpportunity: '',
        businessOpportunityImage: null, companyProduct: '', businessProductImage: null,
        companyDescription: '', companyBusinessModel: '', businessModelImage: null,
        deadline: '', companyBusinessType: '', companyBackground: '',
        companyWebsite: '', companyAddress: '', companyEmail: '', companyPhone: '',
        valuationCap: '', fundingGoal: '', minInvestment: '', maxInvestment: ''
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setFormData(prevState => ({ ...prevState, [name]: files[0] }));
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        // Here you would typically send the data to your backend
    };

    return (
        <div className="container mx-auto p-6">
            <StickyNavbar />
            <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-6">Sign Up as Startup</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField name="username" label="Username" required placeholder="Enter your username" value={formData.username as string} onChange={handleInputChange} />
                            <FormField name="password" label="Password" type="password" required placeholder="Enter your password" value={formData.password as string} onChange={handleInputChange} />
                            <FormField name="firstName" label="First Name" required placeholder="Enter your first name" value={formData.firstName as string} onChange={handleInputChange} />
                            <FormField name="lastName" label="Last Name" required placeholder="Enter your last name" value={formData.lastName as string} onChange={handleInputChange} />
                            <FormField name="email" label="Email" type="email" required placeholder="example@gmail.com" value={formData.email as string} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Company Information</h3>
                        <div className="space-y-4">
                            <FormField name="companyName" label="Company Name" required placeholder="Enter your company name" value={formData.companyName as string} onChange={handleInputChange} />
                            <ImageUpload name="companyLogo" label="Company Logo" required onChange={handleImageUpload} value={formData.companyLogo as File | null} />
                            <FormField name="highlight" label="Highlight" placeholder="Enter company highlight" value={formData.highlight as string} onChange={handleInputChange} />
                            <FormField name="companyOpportunity" label="Company Opportunity" type="textarea" required placeholder="Describe the company opportunity" value={formData.companyOpportunity as string} onChange={handleInputChange} />
                            <ImageUpload name="businessOpportunityImage" label="Business Opportunity Image" required onChange={handleImageUpload} value={formData.businessOpportunityImage as File | null} />
                            <FormField name="companyProduct" label="Company Product" type="textarea" required placeholder="Describe your company's product" value={formData.companyProduct as string} onChange={handleInputChange} />
                            <ImageUpload name="businessProductImage" label="Business Product Image" required onChange={handleImageUpload} value={formData.businessProductImage as File | null} />
                            <FormField name="companyDescription" label="Company Description" type="textarea" required placeholder="Provide a brief company description" value={formData.companyDescription as string} onChange={handleInputChange} />
                            <FormField name="companyBusinessModel" label="Company Business Model" type="textarea" required placeholder="Describe your business model" value={formData.companyBusinessModel as string} onChange={handleInputChange} />
                            <ImageUpload name="businessModelImage" label="Business Model Image" required onChange={handleImageUpload} value={formData.businessModelImage as File | null} />
                            <FormField name="deadline" label="Deadline" type="date" required placeholder="Select a deadline" value={formData.deadline as string} onChange={handleInputChange} />
                            <FormField name="companyBusinessType" label="Company Business Type" type="select" required placeholder="Select business type" value={formData.companyBusinessType as string} onChange={handleInputChange} />
                            <FormField name="companyBackground" label="Company Background" type="textarea" required placeholder="Provide company background information" value={formData.companyBackground as string} onChange={handleInputChange} />
                            <FormField name="companyWebsite" label="Company Website (if have)" type="url" placeholder="https://example.com" value={formData.companyWebsite as string} onChange={handleInputChange} />
                            <FormField name="companyAddress" label="Company Address" required placeholder="Enter company address" value={formData.companyAddress as string} onChange={handleInputChange} />
                            <FormField name="companyEmail" label="Company Email" type="email" required placeholder="company@example.com" value={formData.companyEmail as string} onChange={handleInputChange} />
                            <FormField name="companyPhone" label="Company Phone" type="tel" required placeholder="+1234567890" value={formData.companyPhone as string} onChange={handleInputChange} />
                            <FormField name="valuationCap" label="Valuation Cap (USD)" type="number" required placeholder="Enter valuation cap" value={formData.valuationCap as string} onChange={handleInputChange} />
                            <FormField name="fundingGoal" label="Funding Goal (USD)" type="number" required placeholder="Enter funding goal" value={formData.fundingGoal as string} onChange={handleInputChange} />
                            <FormField name="minInvestment" label="Min Investment (USD)" type="number" required placeholder="Enter minimum investment" value={formData.minInvestment as string} onChange={handleInputChange} />
                            <FormField name="maxInvestment" label="Max Investment (USD)" type="number" required placeholder="Enter maximum investment" value={formData.maxInvestment as string} onChange={handleInputChange} />
                        </div>
                    </div>
                </form>
                <div className="flex justify-between mt-8">
                    <button onClick={() => navigate('/')} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Cancel
                    </button>
                    <button onClick={() => handleSubmit} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </div>
            </div>
        <StickyFooter/>
        </div>
        
    );
};

export default StartupSignUp;