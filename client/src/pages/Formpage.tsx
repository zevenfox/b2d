import React from 'react';


const Form: React.FC = () => {
    return (
        <form className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <label className="block text-gray-700">Valuation Cap</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Valuation cap($)" />
                </div>

                <div>
                    <label className="block text-gray-700">Funding Goal</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Funding goal($)" />
                </div>

                <div>
                    <label className="block text-gray-700">Min Investment</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Min investment($)" />
                </div>

                <div>
                    <label className="block text-gray-700">Max Investment</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Max investment($)" />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700">Opportunity</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Opportunity" />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700">Business Opportunity Image</label>
                    <input type="file" className="w-full p-2 border border-gray-300 rounded" />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700">Product</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Product" />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700">Business Product Image</label>
                    <input type="file" className="w-full p-2 border border-gray-300 rounded" />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700">Description</label>
                    <textarea className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Description"></textarea>
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700">Business Model</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Business Model" />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700">Business Model Image</label>
                    <input type="file" className="w-full p-2 border border-gray-300 rounded" />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700">Deadline</label>
                    <input type="date" className="w-full p-2 border border-gray-300 rounded" />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700">Business Type</label>
                    <select className="w-full p-2 border border-gray-300 rounded">
                        <option>Technology</option>
                        <option>Lifestyle</option>
                        <option>Architect and Engineer</option>
                    </select>
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700">Logo</label>
                    <input type="file" className="w-full p-2 border border-gray-300 rounded" />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700">Background</label>
                    <textarea className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Background"></textarea>
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700">Website</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="http://example.com" />
                </div>

                <div>
                    <label className="block text-gray-700">Email</label>
                    <input type="email" className="w-full p-2 border border-gray-300 rounded" placeholder="example@email.com" />
                </div>

                <div>
                    <label className="block text-gray-700">Address</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Address" />
                </div>

                <div>
                    <label className="block text-gray-700">Phone</label>
                    <input type="tel" className="w-full p-2 border border-gray-300 rounded" placeholder="+234 000 000 0000" />
                </div>

                <div className="col-span-2 flex justify-between">
                    <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">Submit</button>
                </div>
            </div>
        </form>
    );
};

export default Form;