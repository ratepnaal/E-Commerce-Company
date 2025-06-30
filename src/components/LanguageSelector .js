import React, { useState, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext'; 

const LanguageSelector = () => {
   const { currentLanguage, changeLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode } = useContext(ThemeContext);

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
        <ul className={`border border-gray-300 mt-60 rounded-md shadow-lg ${darkMode?`bg-gray-800`:`bg-white `}`}>
          <li onClick={() => handleLanguageChange('en')} className={`px-4 py-2 cursor-pointer ${darkMode?`hover:bg-gray-950`:`hover:bg-gray-200`}`}>English</li>
          <li onClick={() => handleLanguageChange('ar')} className={`px-4 py-2 cursor-pointer ${darkMode?`hover:bg-gray-950`:`hover:bg-gray-200`}`}>Arabic</li>
          <li onClick={() => handleLanguageChange('fr')} className={`px-4 py-2 cursor-pointer ${darkMode?`hover:bg-gray-950`:`hover:bg-gray-200`}`}>French</li>
          <li onClick={() => handleLanguageChange('de')} className={`px-4 py-2 cursor-pointer ${darkMode?`hover:bg-gray-950`:`hover:bg-gray-200`}`}>German</li>
          <li onClick={() => handleLanguageChange('es')} className={`px-4 py-2 cursor-pointer ${darkMode?`hover:bg-gray-950`:`hover:bg-gray-200`}`}>Spanish</li>
          <li onClick={() => handleLanguageChange('zh')} className={`px-4 py-2 cursor-pointer ${darkMode?`hover:bg-gray-950`:`hover:bg-gray-200`}`}>Chinese</li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
