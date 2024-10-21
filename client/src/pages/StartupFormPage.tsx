// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// interface FormData {
//     username: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     companyName: string;
//     companyLogo: File | null;
//     highlight: string;
//     companyOpportunity: string;
//     businessOpportunityImage: File | null;
//     companyProduct: string;
//     businessProductImage: File | null;
//     companyDescription: string;
//     companyBusinessModel: string;
//     businessModelImage: File | null;
//     deadline: string;
//     companyBusinessType: string;
//     companyBackground: string;
//     companyWebsite: string;
//     companyAddress: string;
//     companyEmail: string;
//     companyPhone: string;
//     valuationCap: number;
//     fundingGoal: number;
//     minInvestment: number;
//     maxInvestment: number;
// }

// const FormField: React.FC<{
//     label: string;
//     name: string;
//     type?: string;
//     required?: boolean;
//     value: string | number;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     placeholder?: string;
// }> = ({ label, name, type = "text", required = false, value, onChange, placeholder }) => (
//     <div className="mb-4">
//         <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
//             {label}
//             {required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//         <input
//             type={type}
//             id={name}
//             name={name}
//             required={required}
//             value={value}
//             onChange={onChange}
//             placeholder={placeholder}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//     </div>
// );

// const SelectField: React.FC<{
//     label: string;
//     name: string;
//     required?: boolean;
//     value: string;
//     onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
//     options: string[]; // Options for the dropdown
// }> = ({ label, name, required = false, value, onChange, options }) => (
//     <div className="mb-4">
//         <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
//             {label}
//             {required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//         <select
//             id={name}
//             name={name}
//             required={required}
//             value={value}
//             onChange={onChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//             <option value="">Select {label}</option> {/* Placeholder */}
//             {options.map((option, index) => (
//                 <option key={index} value={option}>
//                     {option}
//                 </option>
//             ))}
//         </select>
//     </div>
// );

// const FileInput: React.FC<{
//     label: string;
//     name: string;
//     required?: boolean;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }> = ({ label, name, required = false, onChange }) => (
//     <div className="mb-4">
//         <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
//             {label}
//             {required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//         <input
//             type="file"
//             id={name}
//             name={name}
//             required={required}
//             onChange={onChange}
//             className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />
//     </div>
// );

// const InvestorSignUp: React.FC = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState<FormData>({
//         username: '',
//         password: '',
//         firstName: '',
//         lastName: '',
//         email: '',
//         companyName: '',
//         companyLogo: null,
//         highlight: '',
//         companyOpportunity: '',
//         businessOpportunityImage: null,
//         companyProduct: '',
//         businessProductImage: null,
//         companyDescription: '',
//         companyBusinessModel: '',
//         businessModelImage: null,
//         deadline: '',
//         companyBusinessType: '',
//         companyBackground: '',
//         companyWebsite: '',
//         companyAddress: '',
//         companyEmail: '',
//         companyPhone: '',
//         valuationCap: 0,
//         fundingGoal: 0,
//         minInvestment: 0,
//         maxInvestment: 0,
//     });

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({ ...prevState, [name]: value }));
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, files } = e.target;
//         if (files && files[0]) {
//             setFormData(prevState => ({ ...prevState, [name]: files[0] }));
//         }
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         // Store investor data in localStorage or handle submission as required
//         localStorage.setItem('investorUsername', formData.username);
//         localStorage.setItem('investorPassword', formData.password);
//         // Add more local storage for company data as needed
//         toast.success('Sign up successful!');
//         navigate('/home');
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//             <div className="sm:mx-auto sm:w-full sm:max-w-md">
//                 <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//                     Sign Up as Start Up
//                 </h2>
//             </div>
//             <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//                 <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//                     <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <FormField
//                             label="Username"
//                             name="username"
//                             required
//                             value={formData.username}
//                             onChange={handleInputChange}
//                             placeholder="Enter your username"
//                         />
//                         <FormField
//                             label="Password"
//                             name="password"
//                             type="password"
//                             required
//                             value={formData.password}
//                             onChange={handleInputChange}
//                             placeholder="Enter your password"
//                         />
//                         <FormField
//                             label="First Name"
//                             name="firstName"
//                             required
//                             value={formData.firstName}
//                             onChange={handleInputChange}
//                             placeholder="Enter your first name"
//                         />
//                         <FormField
//                             label="Last Name"
//                             name="lastName"
//                             required
//                             value={formData.lastName}
//                             onChange={handleInputChange}
//                             placeholder="Enter your last name"
//                         />
//                         <FormField
//                             label="Email"
//                             name="email"
//                             type="email"
//                             required
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             placeholder="Enter your email address"
//                         />
//                         <h3 className="text-xl font-semibold mb-4">Company Information</h3>
//                         <FormField
//                             label="Company Name"
//                             name="companyName"
//                             required
//                             value={formData.companyName}
//                             onChange={handleInputChange}
//                             placeholder="Enter your company name"
//                         />
//                         <FileInput
//                             label="Company Logo"
//                             name="companyLogo"
//                             required
//                             onChange={handleFileChange}
//                         />
//                         <FormField
//                             label="Highlight"
//                             name="highlight"
//                             required 
//                             value={formData.highlight}
//                             onChange={handleInputChange}
//                             placeholder="Enter highlight"
//                         />
//                         <FormField
//                             label="Company Opportunity"
//                             name="companyOpportunity"
//                             required 
//                             value={formData.companyOpportunity}
//                             onChange={handleInputChange}
//                             placeholder="Enter company opportunity"
//                         />
//                         <FileInput
//                             label="Business Opportunity Image"
//                             name="businessOpportunityImage"
//                             required
//                             onChange={handleFileChange}
//                         />
//                         <FormField
//                             label="Company Product"
//                             name="companyProduct"
//                             required 
//                             value={formData.companyProduct}
//                             onChange={handleInputChange}
//                             placeholder="Enter company product"
//                         />
//                         <FileInput
//                             label="Business Product Image"
//                             name="businessProductImage"
//                             onChange={handleFileChange}
//                         />
//                         <FormField
//                             label="Company Description"
//                             name="companyDescription"
//                             required 
//                             value={formData.companyDescription}
//                             onChange={handleInputChange}
//                             placeholder="Enter company description"
//                         />
//                         <FormField
//                             label="Company Business Model"
//                             name="companyBusinessModel"
//                             required 
//                             value={formData.companyBusinessModel}
//                             onChange={handleInputChange}
//                             placeholder="Enter company business model"
//                         />
//                         <FileInput
//                             label="Business Model Image"
//                             name="businessModelImage"
//                             onChange={handleFileChange}
//                         />
//                         <FormField
//                             label="Deadline"
//                             name="deadline"
//                             type="date"
//                             required
//                             value={formData.deadline}
//                             onChange={handleInputChange}
//                         />
//                         <SelectField
//                             label="Company Business Type"
//                             name="companyBusinessType"
//                             required
//                             value={formData.companyBusinessType}
//                             onChange={handleInputChange}
//                             options={['Lifestyle', 'Cosmetic', 'Technology', 'Architect and Engineer', 'Art and Design']}
//                         />
//                         <FormField
//                             label="Company Background"
//                             name="companyBackground"
//                             required 
//                             value={formData.companyBackground}
//                             onChange={handleInputChange}
//                             placeholder="Enter company background"
//                         />
//                         <FormField
//                             label="Company Website"
//                             name="companyWebsite"
//                             required 
//                             value={formData.companyWebsite}
//                             onChange={handleInputChange}
//                             placeholder="Enter company website"
//                         />
//                         <FormField
//                             label="Company Address"
//                             name="companyAddress"
//                             required 
//                             value={formData.companyAddress}
//                             onChange={handleInputChange}
//                             placeholder="Enter company address"
//                         />
//                         <FormField
//                             label="Company Email"
//                             name="companyEmail"
//                             type="email"
//                             required 
//                             value={formData.companyEmail}
//                             onChange={handleInputChange}
//                             placeholder="Enter company email"
//                         />
//                         <FormField
//                             label="Company Phone"
//                             name="companyPhone"
//                             type="tel"
//                             required
//                             value={formData.companyPhone}
//                             onChange={handleInputChange}
//                             placeholder="Enter company phone"
//                         />
//                         <FormField 
//                             label="Valuation Cap (USD)"
//                             name="valuationCap" 
//                             type="number"
//                             required 
//                             placeholder="Enter valuation cap" 
//                             value={formData.valuationCap}
//                             onChange={handleInputChange} 
//                         />
//                         <FormField  
//                             label="Funding Goal (USD)"
//                             name="fundingGoal"
//                             type="number" 
//                             required 
//                             placeholder="Enter funding goal" 
//                             value={formData.fundingGoal} 
//                             onChange={handleInputChange} 
//                         />
//                         <FormField 
//                             label="Min Investment (USD)"
//                             name="minInvestment" 
//                             type="number" 
//                             required 
//                             placeholder="Enter minimum investment" 
//                             value={formData.minInvestment} 
//                             onChange={handleInputChange} 
//                             />
//                         <FormField 
//                             name="maxInvestment" 
//                             label="Max Investment (USD)" 
//                             type="number" 
//                             required 
//                             placeholder="Enter maximum investment" 
//                             value={formData.maxInvestment} 
//                             onChange={handleInputChange} 
//                         />
//                         <div className="flex justify-between">
//                             <button
//                                 type="button"
//                                 onClick={() => navigate('/')}
//                                 className="w-full mr-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="w-full ml-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                             >
//                                 Submit
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default InvestorSignUp;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface FormData {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    companyLogo: File | null;
    highlight: string;
    companyOpportunity: string;
    businessOpportunityImage: File | null;
    companyProduct: string;
    businessProductImage: File | null;
    companyDescription: string;
    companyBusinessModel: string;
    businessModelImage: File | null;
    deadline: string;
    companyBusinessType: string;
    companyBackground: string;
    companyWebsite: string;
    companyAddress: string;
    companyEmail: string;
    companyPhone: string;
    valuationCap: number;
    fundingGoal: number;
    minInvestment: number;
    maxInvestment: number;
}

const FormField: React.FC<{
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}> = ({ label, name, type = "text", required = false, value, onChange, placeholder }) => (
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
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

const StartupSignUp: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        companyLogo: null,
        highlight: '',
        companyOpportunity: '',
        businessOpportunityImage: null,
        companyProduct: '',
        businessProductImage: null,
        companyDescription: '',
        companyBusinessModel: '',
        businessModelImage: null,
        deadline: '',
        companyBusinessType: '',
        companyBackground: '',
        companyWebsite: '',
        companyAddress: '',
        companyEmail: '',
        companyPhone: '',
        valuationCap: 0,
        fundingGoal: 0,
        minInvestment: 0,
        maxInvestment: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData(prevState => ({ ...prevState, [name]: files[0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        Object.keys(formData).forEach((key) => {
            const value = (formData as any)[key];
            if (value !== null && value !== undefined) {
                formDataToSend.append(key, value);
            }
        });

        try {
            const response = await fetch('/api/register/startup', {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                toast.success('Sign up successful!');
                navigate('/home');
            } else {
                const errorData = await response.json();
                toast.error(`Sign up failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            toast.error('Sign up failed. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign Up as Startup
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
                            label="First Name"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter your first name"
                        />
                        <FormField
                            label="Last Name"
                            name="lastName"
                            required
                            value={formData.lastName}
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
                        <FormField
                            label="Company Name"
                            name="companyName"
                            required
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="Enter your company name"
                        />
                        <FileInput
                            label="Company Logo"
                            name="companyLogo"
                            onChange={handleFileChange}
                        />
                        <FormField
                            label="Highlight"
                            name="highlight"
                            required
                            value={formData.highlight}
                            onChange={handleInputChange}
                            placeholder="Enter highlight"
                        />
                        <FormField
                            label="Company Opportunity"
                            name="companyOpportunity"
                            required
                            value={formData.companyOpportunity}
                            onChange={handleInputChange}
                            placeholder="Enter company opportunity"
                        />
                        <FileInput
                            label="Business Opportunity Image"
                            name="businessOpportunityImage"
                            onChange={handleFileChange}
                        />
                        <FormField
                            label="Company Product"
                            name="companyProduct"
                            required
                            value={formData.companyProduct}
                            onChange={handleInputChange}
                            placeholder="Enter company product"
                        />
                        <FileInput
                            label="Business Product Image"
                            name="businessProductImage"
                            onChange={handleFileChange}
                        />
                        <FormField
                            label="Company Description"
                            name="companyDescription"
                            required
                            value={formData.companyDescription}
                            onChange={handleInputChange}
                            placeholder="Enter company description"
                        />
                        <FormField
                            label="Company Business Model"
                            name="companyBusinessModel"
                            required
                            value={formData.companyBusinessModel}
                            onChange={handleInputChange}
                            placeholder="Enter company business model"
                        />
                        <FileInput
                            label="Business Model Image"
                            name="businessModelImage"
                            onChange={handleFileChange}
                        />
                        <FormField
                            label="Deadline"
                            name="deadline"
                            type="date"
                            required
                            value={formData.deadline}
                            onChange={handleInputChange}
                        />
                        <FormField
                            label="Company Business Type"
                            name="companyBusinessType"
                            required
                            value={formData.companyBusinessType}
                            onChange={handleInputChange}
                            placeholder="Enter company business type"
                        />
                        <FormField
                            label="Company Background"
                            name="companyBackground"
                            required
                            value={formData.companyBackground}
                            onChange={handleInputChange}
                            placeholder="Enter company background"
                        />
                        <FormField
                            label="Company Website"
                            name="companyWebsite"
                            required
                            value={formData.companyWebsite}
                            onChange={handleInputChange}
                            placeholder="Enter company website"
                        />
                        <FormField
                            label="Company Address"
                            name="companyAddress"
                            required
                            value={formData.companyAddress}
                            onChange={handleInputChange}
                            placeholder="Enter company address"
                        />
                        <FormField
                            label="Company Email"
                            name="companyEmail"
                            type="email"
                            required
                            value={formData.companyEmail}
                            onChange={handleInputChange}
                            placeholder="Enter company email"
                        />
                        <FormField
                            label="Company Phone"
                            name="companyPhone"
                            required
                            value={formData.companyPhone}
                            onChange={handleInputChange}
                            placeholder="Enter company phone"
                        />
                        <FormField
                            label="Valuation Cap"
                            name="valuationCap"
                            type="number"
                            required
                            value={formData.valuationCap}
                            onChange={handleInputChange}
                        />
                        <FormField
                            label="Funding Goal"
                            name="fundingGoal"
                            type="number"
                            required
                            value={formData.fundingGoal}
                            onChange={handleInputChange}
                        />
                        <FormField
                            label="Minimum Investment"
                            name="minInvestment"
                            type="number"
                            required
                            value={formData.minInvestment}
                            onChange={handleInputChange}
                        />
                        <FormField
                            label="Maximum Investment"
                            name="maxInvestment"
                            type="number"
                            required
                            value={formData.maxInvestment}
                            onChange={handleInputChange}
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

export default StartupSignUp;
