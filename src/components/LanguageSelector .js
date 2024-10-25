import React, { useState } from 'react';

const LanguageSelector = ({ currentLanguage, changeLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button 
        onClick={toggleDropdown} 
        className="bg-blue-500 fixed right-9 p-2 rounded-full shadow-lg w-11 mt-52 
        transition ease-in delay-100 hover:scale-110 hover:bg-indigo-500 duration-300"
      >
        {currentLanguage.toUpperCase()}
      </button>
      {isOpen && (
        <ul className="bg-white border border-gray-300 mt-60 rounded-md shadow-lg">
          <li onClick={() => handleLanguageChange('en')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">English</li>
          <li onClick={() => handleLanguageChange('ar')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Arabic</li>
          <li onClick={() => handleLanguageChange('fr')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">French</li>
          <li onClick={() => handleLanguageChange('de')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">German</li>
          <li onClick={() => handleLanguageChange('es')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Spanish</li>
          <li onClick={() => handleLanguageChange('zh')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Chinese</li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
