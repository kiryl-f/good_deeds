import React from 'react';
import styled from 'styled-components';


import '../src/app/globals.css';

const FooterContainer = styled.footer`
  background-color: #1a202c; /* Tailwind bg-gray-800 */
  color: #a0aec0; /* Tailwind text-gray-400 */
  padding: 1rem 0;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer className="text-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white">
            Contact Us
          </a>
        </div>
        <div className="text-sm">
          © {new Date().getFullYear()} Good Deeds Platform. All rights reserved.
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;
