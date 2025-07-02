import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../images/logo.svg';
import IconLogout from '../images/icons/Logout.svg';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { darkMode } = useContext(ThemeContext);

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
    <header className={`sticky top-0 z-50 flex justify-between items-center p-4 shadow-md transition-all ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-teal-700 text-white'}`}>
      <div className="flex items-center space-x-4">
        <img src={Logo} alt="Logo" className="h-10" />
        <span className={`text-sm md:text-xs font-semibold tracking-widest ${darkMode ? `text-white` : ``}`}>
          {t('company_name_line1')} <br /> {t('company_name_line2')}
        </span>
      </div>

      <nav className={`hidden md:flex space-x-6 ${darkMode ? 'text-gray-100' : 'text-white'} relative`}>
        <Link to="/landing" className="text-lg font-medium hover:border-b-2 hover:border-white">{t('home')}</Link>
        <a href="#projects" className="text-lg font-medium hover:border-b-2 hover:border-white">{t('projects')}</a>
        <a href="#contact" className="text-lg font-medium hover:border-b-2 hover:border-white">{t('contact')}</a>
        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="text-lg font-medium hover:border-b-2 hover:border-white flex items-center gap-1">
            {t('menu')}
            <span className="text-xs">▼</span>
          </button>
          {isDropdownOpen && (
            <div className={`absolute left-1/2 -translate-x-1/2 mt-2 w-52 shadow-lg p-4 rounded-lg z-50 ${darkMode ? 'bg-gray-800 text-gray-100 border border-gray-700' : 'bg-white text-black border border-gray-200'}`}
                 style={{ minWidth: '180px' }}>
              {/* Arrow */}
              <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 ${darkMode ? 'bg-gray-800 border-l border-t border-gray-700' : 'bg-white border-l border-t border-gray-200'}`} style={{ transform: 'translate(-50%, -50%) rotate(45deg)', zIndex: 1 }}></div>
              <ul className="space-y-2 text-lg relative z-10">
                <li><Link to="/landing" className="hover:bg-teal-700 p-2 rounded-lg" onClick={toggleDropdown}>{t('landscaping')}</Link></li>
                <li><a href="#projects" className="hover:bg-teal-700 p-2 rounded-lg" onClick={toggleDropdown}>{t('projects')}</a></li>
                <li><a href="#contact" className="hover:bg-teal-700 p-2 rounded-lg" onClick={toggleDropdown}>{t('contact')}</a></li>
                <li><Link to="/profile" className="hover:bg-teal-700 p-2 rounded-lg" onClick={toggleDropdown}>{t('profile')}</Link></li>
                {isAuthenticated ? (
                  <>
                    <hr className={darkMode ? 'border-gray-500' : 'border-gray-300'} />
                    <li>
                      <button onClick={handleLogout} className="w-full text-left flex items-center hover:bg-red-500 hover:text-white p-2 rounded-lg">
                        <img src={IconLogout} alt="Logout" className="h-5 w-5 mr-2" />
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
              </ul>
            </div>
          )}
        </div>
      </nav>

      <div className="flex items-center space-x-8">
        <input
          type="text"
          placeholder={t('search')}
          className={`hidden md:block p-2 pr-8 rounded-lg text-sm border transition ${darkMode ? 'bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-400' : 'bg-white text-black border-gray-300 placeholder-black'}`}
        />
        <button className="block md:hidden text-2xl" onClick={handleMenuClick}>☰</button>
        <button className={`font-medium py-2 px-4 rounded-lg text-sm border transition ${darkMode ? 'bg-green-700 hover:bg-green-800 text-white border-green-900' : 'bg-green-400 hover:bg-green-600 text-white border-white'}`}>
          {t('book_now')}
        </button>
      </div>

      {isMenuOpen && (
        <div className={`fixed inset-0 flex flex-col p-6 z-50 transition duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-black'}`}>
          <button
            onClick={handleMenuClick}
            className={`self-end text-2xl  mb-4 ${darkMode?`text-white`:`text-black`}`}
          >
            &times;
          </button>
          <ul className="space-y-4 text-lg">
            <li><Link to="/landing" className="hover:bg-teal-700 p-2 rounded-lg" onClick={toggleDropdown}>{t('landscaping')}</Link></li>
            <li><a href="#projects" className="hover:bg-teal-700 p-2 rounded-lg" onClick={toggleDropdown}>{t('projects')}</a></li>
            <li><a href="#contact" className="hover:bg-teal-700 p-2 rounded-lg" onClick={toggleDropdown}>{t('contact')}</a></li>
            <li><Link to="/profile" className="hover:bg-teal-700 p-2 rounded-lg" onClick={toggleDropdown}>{t('profile')}</Link></li>
             {/* -- الجزء الديناميكي -- */}
            {isAuthenticated ? (
              <>
                <hr className={darkMode ? 'border-gray-500' : 'border-gray-300'} />
                <li>
                  <button onClick={handleLogout} className="w-full text-left flex items-center hover:bg-red-500 hover:text-white p-2 rounded-lg">
                    <img src={IconLogout} alt="Logout" className="h-5 w-5 mr-2" />
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


