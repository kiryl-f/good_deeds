import React from 'react';


import '../src/app/globals.css';


const Footer: React.FC = () => {
  return (
    <div className="text-center bg-gray-800 py-5">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-white">
            Privacy Policy
          </a>
          <a href="#" className="text-white">
            Terms of Service
          </a>
          <a href="#" className="text-white">
            Contact Us
          </a>
        </div>
        <div className="text-white">
          © {new Date().getFullYear()} Good Deeds Platform. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
