import React from "react";
import GithubLogo from '../../images/mini-github-icon.png';
import GmailLogo from '../../images/mini-gmail-icon.png';

const Footer = () => {
    return (
        <footer className="w-full h-48 bg-[#0C1A2A] flex justify-around items-center px-8 md:px-16">
            <div>
                <h1 className="text-white font-bold text-xl whitespace-nowrap">
                    B2D venture
                </h1>
                <p className="mt-2 text-gray-400 size-11/12 text-xs">
                    Providing opportunities for asian startups
                </p>
            </div>
            <div className="pl-24">
                <h2 className="text-gray-600 font-bold text-xs">
                    Terms and Conditions
                </h2>
                <p className="mt-4 text-gray-600 size-11/12 text-xs">
                    By accessing or using our platform, you agree to comply with and be bound by the following Terms and
                    Conditions. These Terms govern your use of the B2D Venture platform and any related services or
                    features. Your continued use of the platform signifies your acceptance of these Terms. If you do not
                    agree with these Terms, please do not use the platform. You are responsible for maintaining the
                    confidentiality of your account credentials and for all activities that occur under your account.
                    B2D Venture reserves the right to modify these Terms at any time, and such modifications will be
                    effective immediately upon posting. It is your responsibility to review these Terms periodically for
                    any changes. The platform may include links to third-party websites; however, B2D Venture does not
                    endorse or take responsibility for the content, privacy policies, or practices of these third-party
                    sites. Your use of the platform is at your own risk, and B2D Venture will not be liable for any
                    damages arising from your use of the platform, including but not limited to indirect, incidental, or
                    consequential damages.
                </p>
            </div>
            <div>
                <h1 className="text-white font-bold text-xl whitespace-nowrap">
                    Contact us?
                </h1>
                <div className="flex px-4 pt-2 justify-between">
                    <img src={GithubLogo} alt="GithubLogo" className="size-8"/>
                    <img src={GmailLogo} alt="GmailLogo" className="size-8"/>
                </div>
            </div>
        </footer>
    );
};

export default Footer;