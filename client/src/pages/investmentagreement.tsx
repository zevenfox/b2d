import React from "react";

const InvestmentAgreement: React.FC = () => {
    return (
        <div className="bg-white p-8 max-w-3xl mx-auto mt-8 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Investment Agreement</h1>
            <p className="mb-4">
                This Investment Agreement (the "Agreement") is entered into by and between the Investor ("You") and the Company ("We" or "Company").
                By investing in the Company, you agree to the terms and conditions set forth below. Please read this Agreement carefully before proceeding.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">1. Investment Amount</h2>
            <p className="mb-4">
                You agree to invest the amount specified in the investment form. This amount is non-refundable once the transaction has been processed.
                You acknowledge that this investment carries risk, including the risk of total loss.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">2. Acknowledgment of Risks</h2>
            <p className="mb-4">
                By investing, you acknowledge that you understand the risks involved in this investment, including the possibility of a total loss of your
                invested capital. You represent that you have sufficient knowledge and experience in financial and business matters to be capable of evaluating the
                merits and risks of this investment.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">3. Investment Restrictions</h2>
            <p className="mb-4">
                Your investment is subject to any restrictions that may be specified by the Company, including minimum and maximum investment amounts.
                These restrictions are in place to ensure fair and responsible investment practices.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">4. No Guarantee of Returns</h2>
            <p className="mb-4">
                The Company makes no guarantees regarding any returns on your investment. Any projections provided are purely hypothetical and should not be
                interpreted as a promise of actual returns. Investment outcomes are subject to market risks and various uncertainties.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">5. Confidentiality</h2>
            <p className="mb-4">
                You agree to maintain the confidentiality of all non-public information regarding the Company that is disclosed to you as part of this investment
                process. You shall not disclose such information to any third party without prior written consent from the Company.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">6. Termination</h2>
            <p className="mb-4">
                This Agreement may be terminated by the Company at any time if it determines, at its sole discretion, that you have breached any terms of this
                Agreement or if the Company decides to cease offering investments.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">7. Governing Law</h2>
            <p className="mb-4">
                This Agreement shall be governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law
                principles. Any disputes arising from this Agreement shall be resolved exclusively in the courts of [Your Jurisdiction].
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-2">8. Acknowledgment and Agreement</h2>
            <p className="mb-4">
                By investing in the Company, you acknowledge that you have read, understood, and agreed to the terms of this Investment Agreement. This Agreement
                represents the entire understanding between you and the Company regarding your investment and supersedes any prior agreements or understandings.
            </p>

            <p className="text-center mt-8">
                <strong>Please keep a copy of this Agreement for your records.</strong>
            </p>
        </div>
    );
};

export default InvestmentAgreement;
