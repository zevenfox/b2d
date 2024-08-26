import React from "react";
import StickyNavbar from './components/Navbar';
import Logo from '../images/Lexi-logo.png';
import HighlightImage from '../images/Lexi-highlightpic.png';
import ProductImage from '../images/Lexi-product-img.png';
import BusinessModelImage from '../images/Lexi-businessmodel-img.png';

function StartupPage() {
    return (
        <div className="text-left">
            <StickyNavbar/>
            <header className="mx-auto px-56 py-16 text-left">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <img src={Logo} alt="Logo" className="size-16"/>
                    </div>
                    <div className="flex-grow ml-8">
                        <h1 className="text-6xl font-bold">
                            LEXI
                        </h1>
                    </div>
                </div>
                <p className="text-xl text-gray-700 mt-4">
                    Wireless Building Automation: Cost-effective Energy Management & Decarbonization
                </p>
            </header>
            <div className="mx-auto px-56 text-left">
                <div className="flex items-start">
                    <div className="flex-grow">
                        <img src={HighlightImage} alt="Highlight" className="w-full"/>
                    </div>
                    <div className="flex-none ml-16">
                        <div className="bg-black text-white p-6 rounded-md w-72">
                            <div className="text-3xl font-bold text-[#C3FF73]">3</div>
                            <div className="text-gray-400">Investors</div>
                            <div className="mt-4">
                                <div className="text-4xl font-bold text-[#C3FF73]">$25,500</div>
                                <div className="text-gray-400">51% raised of $50K goal</div>
                                <div className="h-2 bg-gray-700 mt-2 rounded-[10px]">
                                    <div className="h-full bg-[#C3FF73] rounded-[10px]" style={{width: '51%'}}></div>
                                </div>
                            </div>
                            <div className="text-3xl mt-6 text-white font-bold text-[#C3FF73]">85 days</div>
                            <div className="text-gray-400">Left to invest</div>
                            <button className="mt-6 bg-[#C3FF73] text-black w-full py-2 font-bold rounded">Invest in
                                LEXI
                            </button>
                            <div className="mt-4 text-gray-400 text-center">$100 minimum investment</div>
                        </div>
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="flex-grow">
                        <h1 className="text-3xl font-bold pt-24">
                            Highlights
                        </h1>
                        <div>
                            <p className="mt-4 text-gray-600 text-xl">
                                A sustainable and safe battery company, supported by the US Department of State,
                                Google, and others, designs batteries with over 5,000 charge cycles and zero
                                environmental
                                impact. With a strong clean energy background, the founding team joined the Plug and
                                Play accelerateAZ Sustainability program and signed 9 NDAs with energy companies
                                generating
                                $14 billion in annual revenue. In August 2024, F6S.com’s AI ranked the company among the
                                top
                                3
                                US battery companies.
                            </p>
                            <div className="pt-32">
                                <div className="h-px flex-auto bg-gray-300"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-none ml-16">
                        <div className="bg-black text-lime-400 p-6 rounded-md w-72 mt-8">
                            <div className="mb-6">
                                <div className="text-xl font-bold text-[#C3FF73]">Valuation cap</div>
                                <div className="text-white">$12,500,000</div>
                            </div>
                            <div className="h-px bg-gray-500"></div>
                            <div className="my-6">
                                <div className="text-xl font-bold text-[#C3FF73]">Funding goal</div>
                                <div className="text-white">$50K / $618K</div>
                            </div>
                            <div className="h-px bg-gray-500"></div>
                            <div className="my-6">
                                <div className="text-xl font-bold text-[#C3FF73]">Min&Max investment</div>
                                <div className="text-white">$500 to $100k</div>
                            </div>
                            <div className="h-px bg-gray-500"></div>
                            <div className="mt-6">
                                <div className="text-xl font-bold text-[#C3FF73]">Deadline</div>
                                <div className="text-white">November 12, 2024</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-auto px-56 text-left">
                <h1 className="text-3xl font-bold pt-16">
                    Opportunity
                </h1>
                <div className="size-4/5">
                    <p className="mt-4 text-gray-600 text-xl">
                        A sustainable and safe battery company, supported by the US Department of State,
                        Google, and others, designs batteries with over 5,000 charge cycles and zero environmental
                        impact.
                        With a strong clean energy background, the founding team joined the Plug and Play accelerateAZ
                        Sustainability program and signed 9 NDAs with energy companies generating $14 billion in annual
                        revenue.
                        In August 2024, F6S.com’s AI ranked the company among the top 3 US battery companies.
                    </p>
                    <div className="pt-16">
                        <div className="h-px flex-auto bg-gray-300"></div>
                    </div>
                </div>
            </div>
            <div className="mx-auto px-56 text-left">
                <h1 className="text-3xl font-bold pt-16">
                    Product
                </h1>
                <img src={ProductImage} alt="Product" className="size-4/5 pt-16"/>
                <p className="mt-4 text-gray-600 text-xl pt-16">
                    A sustainable and safe battery company, supported by the US Department of State,
                    Google, and others, designs batteries with over 5,000 charge cycles and zero environmental impact.
                    With a strong clean energy background, the founding team joined the Plug and Play accelerateAZ
                    Sustainability program and signed 9 NDAs with energy companies generating $14 billion in annual
                    revenue.
                    In August 2024, F6S.com’s AI ranked the company among the top 3 US battery companies.
                </p>
                <div className="pt-16">
                    <div className="h-px flex-auto bg-gray-300"></div>
                </div>
            </div>
            <div className="mx-auto px-56 text-left">
                <h1 className="text-3xl font-bold pt-16">
                    Business Model
                </h1>
                <img src={BusinessModelImage} alt="BusinessModel" className="size-4/5 pt-16"/>
                <p className="mt-4 text-gray-600 text-xl pt-16">
                    A sustainable and safe battery company, supported by the US Department of State,
                    Google, and others, designs batteries with over 5,000 charge cycles and zero environmental impact.
                    With a strong clean energy background, the founding team joined the Plug and Play accelerateAZ
                    Sustainability program and signed 9 NDAs with energy companies generating $14 billion in annual
                    revenue.
                    In August 2024, F6S.com’s AI ranked the company among the top 3 US battery companies.
                </p>
                <div className="pt-16">
                    <div className="h-px flex-auto bg-gray-300"></div>
                </div>
            </div>
            <div className="mx-auto px-56 text-left">
                <h1 className="text-3xl font-bold pt-16">
                    Company Info
                </h1>
                <p className="mt-4 text-gray-600 text-xl py-16">
                    A sustainable and safe battery company, supported by the US Department of State,
                    Google, and others, designs batteries with over 5,000 charge cycles and zero environmental impact.
                    With a strong clean energy background, the founding team joined the Plug and Play accelerateAZ
                    Sustainability program and signed 9 NDAs with energy companies generating $14 billion in annual
                    revenue.
                    In August 2024, F6S.com’s AI ranked the company among the top 3 US battery companies.
                </p>
            </div>
        </div>
    );
}

export default StartupPage;
