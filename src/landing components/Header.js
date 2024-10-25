import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

const Header = ({ darkMode, setDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // للتحكم بالقائمة المنسدلة في الشاشات الكبيرة
  const { t } = useTranslation();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="flex justify-between items-center bg-teal-700 text-white p-4 relative">
      <div className="flex items-center space-x-4">
        <img src={Logo} alt="Logo" className="h-10" />
        <span className={`text-sm md:text-xs font-semibold tracking-widest ${darkMode ? `text-black` : ``}`}>
          {t('company_name_line1')} <br /> {t('company_name_line2')}
        </span>
      </div>

      <nav className={`hidden md:flex space-x-6 ${darkMode ? `text-black` : ``}`}>
        <Link to="/landing" className="text-lg font-medium hover:border-b-2 hover:border-white">{t('home')}</Link>
        <a href="#about" className="text-lg font-medium hover:border-b-2 hover:border-white">{t('about_us_section')}</a>
        <a href="#projects" className="text-lg font-medium hover:border-b-2 hover:border-white">{t('projects')}</a>
        <button onClick={toggleDropdown} className="text-lg font-medium hover:border-b-2 hover:border-white">{t('menu')}</button>
      </nav>
      {isDropdownOpen && (
        <div className="absolute top-14 right-4 w-48 bg-white shadow-lg p-4 rounded-lg text-black z-50">
          <ul className="space-y-2 text-lg">
            <li><Link to="/landing" className="hover:bg-teal-700 p-2 rounded-lg">{t('landscaping')}</Link></li>
            <li><a href="#dec" className="hover:bg-teal-700 p-2 rounded-lg">{t('decking')}</a></li>
            <li><a href="#gard" className="hover:bg-teal-700 p-2 rounded-lg">{t('gardening')}</a></li>
            <li><a href="#inter" className="hover:bg-teal-700 p-2 rounded-lg">{t('interlocking')}</a></li>
            <li><a href="#floral" className="hover:bg-teal-700 p-2 rounded-lg">{t('floral_design')}</a></li>
            <li><a href="#pools" className="hover:bg-teal-700 p-2 rounded-lg">{t('pools')}</a></li>
            <li><a href="#railing" className="hover:bg-teal-700 p-2 rounded-lg">{t('railings')}</a></li>
          </ul>
        </div>
      )}

      <div className="flex items-center space-x-8">
        <input
          type="text"
          placeholder={t('search')}
          className={`hidden md:block p-2 pr-8 rounded-lg text-black text-sm ${darkMode ? `bg-gray-800 text-white` : ``}`}
        />
        <button className="block md:hidden text-2xl" onClick={handleMenuClick}>☰</button>
        <button className="bg-green-400 font-medium hover:bg-green-600 text-black py-2 px-4 rounded-lg text-sm border border-white">
          {t('book_now')}
        </button>
      </div>

      {isMenuOpen && (
        <div className={`fixed inset-0 flex flex-col bg-white text-black p-6 z-50 transition duration-300 ${darkMode ? `bg-gray-800 text-white` : ``}`}>
          <button
            onClick={handleMenuClick}
            className="self-end text-2xl text-black mb-4"
          >
            &times;
          </button>
          <ul className="space-y-4 text-lg">
            <li><Link to="/landing" className="hover:bg-teal-700 p-2 rounded-lg">{t('landscaping')}</Link></li>
            <li><a href="#dec" className="hover:bg-teal-700 p-2 rounded-lg">{t('decking')}</a></li>
            <li><a href="#gard" className="hover:bg-teal-700 p-2 rounded-lg">{t('gardening')}</a></li>
            <li><a href="#inter" className="hover:bg-teal-700 p-2 rounded-lg">{t('interlocking')}</a></li>
            <li><a href="#floral" className="hover:bg-teal-700 p-2 rounded-lg">{t('floral_design')}</a></li>
            <li><a href="#pools" className="hover:bg-teal-700 p-2 rounded-lg">{t('pools')}</a></li>
            <li><a href="#railing" className="hover:bg-teal-700 p-2 rounded-lg">{t('railings')}</a></li>
            <li><Link to="/profile" className="hover:bg-teal-700 p-2 rounded-lg">{t('profile')}</Link></li>
            <li><a href="#contact" className="hover:bg-teal-700 p-2 rounded-lg">{t('contact')}</a></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;


