import React from 'react'
import Logo from '../images/logo.svg'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({darkMode , setDarkMode}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   // Toggle menu
   const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className={`flex justify-between items-center bg-teal-700 text-white p-4`}>
      <div className="flex items-center space-x-4">
        <img src={Logo} alt="Logo" className="h-10" />
        <span className={`text-sm md:text-xs font-semibold tracking-widest  ${darkMode?`text-black`:``}`}>THE CONSTRUCTION AND <br></br> LANDSCAPING COMPANY</span>
      </div>

      <nav className={`hidden md:flex space-x-6  ${darkMode?`text-black`:``}`}>
        <Link to="/landing" className="text-lg font-medium hover:border-b-2 hover:border-white">HOME</Link>
        <a href="#about"  className="text-lg  font-medium hover:border-b-2 hover:border-white">ABOUT US</a>
        <a href="#projects"  className="text-lg  font-medium hover:border-b-2 hover:border-white">PROJECTS</a>
      </nav>

      <div className="flex items-center space-x-8">
        <input 
          type="text" 
          placeholder="Search..." 
          className={`hidden md:block p-2 pr-8 rounded-lg text-black text-sm  ${darkMode?`bg-gray-800 text-white`:``}`}
        />
        <div className="flex items-center space-x-1">
          <button className="block md:hidden text-2xl" onClick={handleMenuClick}>☰</button>
          <span className={`hidden md:block text-lg font-medium cursor-pointer  ${darkMode?`text-black`:``} `} onClick={handleMenuClick}>MENU</span>
        </div>
        <button className={`bg-green-400 font-medium hover:bg-green-600
         text-black py-2 px-4 rounded-lg text-sm border border-white`}>
          BOOK NOW 
        </button>
      </div>
          {/* Menu section */}
          {isMenuOpen && (
        <div className={`absolute top-0 w-64 bg-white shadow-lg p-4 text-black z-50 ${darkMode?`bg-gray-700 text-white`:``}`} >
          <ul className="space-y-2 text-lg ">
           <li><a href='#land' className='hover:bg-teal-700'><Link to="/landing">LANDSCAPING</Link></a></li> 
           <li><a href='#dec' className='hover:bg-teal-700'>DECKING</a></li> 
           <li><a href='#gard' className='hover:bg-teal-700'>GARDENING</a></li> 
           <li><a href='#inter' className='hover:bg-teal-700'>INTERLOCKING</a></li>
           <li><a href='#floral' className='hover:bg-teal-700'>FLORAL DESIGN</a></li>
           <li><a href='#pools' className='hover:bg-teal-700'>POOLS</a></li>
           <li><a href='#railing' className='hover:bg-teal-700'>RAILINGS</a></li>
           <li><a href='#services' className='hover:bg-teal-700'>WOODWORKING</a></li>
           <li><a href='#showroom' className='hover:bg-teal-700'>SHOWROOM</a></li>
           <li><Link to="/profile"  className='hover:bg-teal-700'>PROFILE</Link></li>
           <li><a href='#contact' className='hover:bg-teal-700' >CONTACT US</a></li>
          </ul>
          <div 
            onClick={handleMenuClick} 
            className="absolute top-2 right-2 text-xl cursor-pointer">
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
