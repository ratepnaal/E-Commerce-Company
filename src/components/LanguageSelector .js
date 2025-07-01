import React, { useState, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext'; 

const LanguageSelector = () => {
   const { currentLanguage, changeLanguage } = useContext(LanguageContext);
  const { darkMode } = useContext(ThemeContext);

  const handleToggleLanguage = () => {
    changeLanguage(currentLanguage === 'en' ? 'ar' : 'en');
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <button 
        onClick={handleToggleLanguage} 
        className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg border-2 transition-all duration-300
        ${darkMode ? 'bg-gray-800 border-blue-400 text-blue-300' : 'bg-white border-blue-500 text-blue-600'}
        hover:scale-110 hover:shadow-2xl`}
        aria-label="Switch Language"
      >
        {currentLanguage.toUpperCase()}
      </button>
    </div>
  );
};

export default LanguageSelector;
