import React from 'react';
import Logo from '../images/logo.svg';
import FacebookIcon from '../images/icons/facebook.svg';
import InstgramIcon from '../images/icons/instgram.svg';

const Footer = () => {
  return (
    <footer className="bg-teal-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0 px-4 md:px-0">
        {/*Logo & Social Media */}
        <div className="flex flex-col items-start space-y-4 md:w-1/4">
          <img src={Logo} alt="Company Logo" className="w-16" />
          <p className="text-xs">THE CONSTRUCTION AND LANDSCAPING COMPANY</p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={FacebookIcon} alt="Facebook" className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={InstgramIcon} alt="Instagram" className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Hour Of Work*/}
        <div className="flex flex-col items-start md:w-1/4">
          <h3 className="font-bold text-sm mb-2">BUSINESS HOURS:</h3>
          <p className="text-xs">MONDAY - FRIDAY: 8 AM - 6 PM</p>
          <p className="text-xs">SATURDAY: 9 AM - 4 PM</p>
          <p className="text-xs">SUNDAY: CLOSED</p>
        </div>

        {/*Quick Links */}
        <div className="flex flex-col items-start md:w-1/4">
          <h3 className="font-bold text-sm mb-2">QUICK LINKS:</h3>
          <ul className="text-xs space-y-1">
            <li><a href="#" className="hover:underline">HOME</a></li>
            <li><a href="#about" className="hover:underline">ABOUT US</a></li>
            <li><a href="#services" className="hover:underline">SERVICES</a></li>
            <li><a href="#projects" className="hover:underline">PROJECTS</a></li>
            <li><a href="#contact" className="hover:underline">CONTACT</a></li>
          </ul>
        </div>

        {/*Cartificatie*/}
        <div className="flex flex-col items-start md:w-1/4">
          <h3 className="font-bold text-sm mb-2">AWARDS AND CERTIFICATIONS:</h3>
          <p className="text-xs mb-1">* PROUD MEMBER OF THE NATIONAL ASSOCIATION OF LANDSCAPE PROFESSIONALS</p>
          <p className="text-xs">* "CERTIFIED GREEN BUILDER"</p>
        </div>
      </div>

      {/*Right reseved*/}
      <div className="text-center text-xs mt-8">
        © 2024 Z AND N CONSTRUCTION AND LANDSCAPING. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;

