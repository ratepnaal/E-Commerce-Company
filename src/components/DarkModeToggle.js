import { FaSun, FaMoon } from 'react-icons/fa'; // استخدام أيقونات من مكتبة react-icons
import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  return (
    <button
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full shadow-lg border-2 transition-all duration-300 cursor-pointer
        ${darkMode ? 'bg-gray-800 border-yellow-400 text-yellow-300' : 'bg-white border-yellow-500 text-yellow-600'}
        hover:scale-110 hover:shadow-2xl`}
      onClick={toggleDarkMode}
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? (
        <FaMoon size={26} className="transition-transform duration-300 rotate-12" />
      ) : (
        <FaSun size={26} className="transition-transform duration-300 rotate-0" />
      )}
    </button>
  );
};

export default DarkModeToggle;

