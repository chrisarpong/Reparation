import React from 'react';
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="bg-[#001b3d] text-white py-2 px-6 text-sm hidden md:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaPhone className="text-white text-xs" />
            <span>+233 (0) 30 274 8100</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-white text-xs" />
            <a href="mailto:info@mfa.gov.gh" className="hover:text-gray-300 transition-colors">info@mfa.gov.gh</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-300 transition-colors"><FaFacebook /></a>
          <a href="#" className="hover:text-gray-300 transition-colors"><FaTwitter /></a>
          <a href="#" className="hover:text-gray-300 transition-colors"><FaInstagram /></a>
          <a href="#" className="hover:text-gray-300 transition-colors"><FaLinkedin /></a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
