import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../images/logo.svg';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = ({ darkMode, setDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();
   const navigate = useNavigate();
   const { isAuthenticated, logout } = useAuth();

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
    const handleLogout = () => {
    logout();
    navigate('/'); // توجيه المستخدم لصفحة تسجيل الدخول بعد الخروج
    toggleDropdown(); // إغلاق القائمة المنسدلة
  };

  return (
    <header className="flex justify-between items-center bg-teal-700 text-white p-4 relative">
      <div className="flex items-center space-x-4">
        <img src={Logo} alt="Logo" className="h-10" />
        <span className={`text-sm md:text-xs font-semibold tracking-widest ${darkMode ? `text-white` : ``}`}>
          {t('company_name_line1')} <br /> {t('company_name_line2')}
        </span>
      </div>

      <nav className={`hidden md:flex space-x-6 text-white`}>
        <Link to="/landing" className="text-lg font-medium hover:border-b-2 hover:border-white">{t('home')}</Link>
        <a href="#about" className="text-lg font-medium hover:border-b-2 hover:border-white">{t('about_us_section')}</a>
        <a href="#projects" className="text-lg font-medium hover:border-b-2 hover:border-white">{t('projects')}</a>
        <button onClick={toggleDropdown} className="text-lg font-medium hover:border-b-2 hover:border-white">{t('menu')}</button>
      </nav>
      {isDropdownOpen && (
        <div className={`absolute top-14 right-4 w-48 shadow-lg p-4 rounded-lg z-50 ${darkMode?`bg-gray-800 text-white`:` bg-white  text-black`}`}>
          <ul className="space-y-2 text-lg">
            <li><Link to="/landing" className="hover:bg-teal-700 p-2 rounded-lg" onClick={toggleDropdown}>{t('landscaping')}</Link></li>
            <li><a href="#dec" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('decking')}</a></li>
            <li><a href="#gard" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('gardening')}</a></li>
            <li><a href="#inter" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('interlocking')}</a></li>
            <li><a href="#floral" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('floral_design')}</a></li>
            <li><Link to="/profile" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('profile')}</Link></li>
            <li><a href="#pools" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('pools')}</a></li>
            <li><a href="#railing" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('railings')}</a></li>
            <li><a href="#contact" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('contact')}</a></li>
             {/* -- الجزء الديناميكي -- */}
            {isAuthenticated ? (
              <>
                <hr className={darkMode ? 'border-gray-500' : 'border-gray-300'} />
                <li><Link to="/profile" className="block hover:bg-teal-700 hover:text-white p-2 rounded-lg" onClick={toggleDropdown}>{t('profile')}</Link></li>
                <li>
                  <button onClick={handleLogout} className="w-full text-left flex items-center hover:bg-red-500 hover:text-white p-2 rounded-lg">
                    <img alt="Logout" className="h-4 w-4 mr-2" />
                    {t('logout')}
                  </button>
                </li>
              </>
            ) : (
              <>
                <hr className={darkMode ? 'border-gray-500' : 'border-gray-300'} />
                <li><Link to="/" className="block hover:bg-teal-700 hover:text-white p-2 rounded-lg" onClick={toggleDropdown}>{t('login')}</Link></li>
              </>
            )}
            {/* -- نهاية الجزء الديناميكي -- */}
          </ul>
        </div>
      )}

      <div className="flex items-center space-x-8">
        <input
          type="text"
          placeholder={t('search')}
          className={`hidden md:block p-2 pr-8 rounded-lg  text-sm ${darkMode?`bg-gray-800 text-white`:` bg-white  text-black`}`}
        />
        <button className="block md:hidden text-2xl" onClick={handleMenuClick}>☰</button>
        <button className="bg-green-400 font-medium hover:bg-green-600 text-white  py-2 px-4 rounded-lg text-sm border border-white">
          {t('book_now')}
        </button>
      </div>

      {isMenuOpen && (
        <div className={`fixed inset-0 flex flex-col p-6 z-50 transition duration-300${darkMode?`bg-gray-800 text-white`:` bg-white  text-black`}`}>
          <button
            onClick={handleMenuClick}
            className={`self-end text-2xl  mb-4 ${darkMode?`text-white`:`text-black`}`}
          >
            &times;
          </button>
          <ul className="space-y-4 text-lg">
            <li><Link to="/landing" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('landscaping')}</Link></li>
            <li><a href="#dec" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('decking')}</a></li>
            <li><a href="#gard" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('gardening')}</a></li>
            <li><a href="#inter" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('interlocking')}</a></li>
            <li><a href="#floral" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('floral_design')}</a></li>
            <li><a href="#pools" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('pools')}</a></li>
            <li><a href="#railing" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('railings')}</a></li>
            <li><Link to="/profile" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('profile')}</Link></li>
            <li><a href="#contact" className="hover:bg-teal-700 p-2 rounded-lg"  onClick={toggleDropdown}>{t('contact')}</a></li>
               {/* -- الجزء الديناميكي -- */}
            {isAuthenticated ? (
              <>
                <hr className={darkMode ? 'border-gray-500' : 'border-gray-300'} />
                <li><Link to="/profile" className="block hover:bg-teal-700 hover:text-white p-2 rounded-lg" onClick={toggleDropdown}>{t('profile')}</Link></li>
                <li>
                  <button onClick={handleLogout} className="w-full text-left flex items-center hover:bg-red-500 hover:text-white p-2 rounded-lg">
                    <img alt="Logout" className="h-4 w-4 mr-2" />
                    {t('logout')}
                  </button>
                </li>
              </>
            ) : (
              <>
                <hr className={darkMode ? 'border-gray-500' : 'border-gray-300'} />
                <li><Link to="/" className="block hover:bg-teal-700 hover:text-white p-2 rounded-lg" onClick={toggleDropdown}>{t('login')}</Link></li>
              </>
            )}
            {/* -- نهاية الجزء الديناميكي -- */}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;


