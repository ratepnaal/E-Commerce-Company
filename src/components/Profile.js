import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import profileImage from '../images/profile-image.png';
import BackgroundShadow from '../images/shadow-of-background.png';
import BackgroundProfile from '../images/Background-profile.png';
import Lawn from '../images/the lawn.png'; 
import Header from '../landing components/Header';
import IconLogout from '../images/icons/Logout.svg';
import DarkModeToggle from './DarkModeToggle';

const Profile = ({darkMode , setDarkMode}) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Toggle logout confirmation
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  // Close logout confirmation
  const handleCloseLogout = () => {
    setShowLogoutConfirm(false);
  };
  const {t} = useTranslation();

  return (
    <div className="relative pt-0">
      <Header/>
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
      {/* Background image */}
      <div className="relative">
        <img src={BackgroundProfile} alt="Background" className="w-full h-64 object-cover" />
        <img src={BackgroundShadow} alt="Shadow" className="absolute top-0 left-0 w-full h-full " />
      </div>

      {/* Profile and Info section */}
      <div className="flex w-full h-auto">
        {/* Lawn section (25%) */}
        <div className="w-2/5  relative">
          <div className="absolute bottom-0 left-0">
            <img src={Lawn} alt="Lawn" className="w-full h-auto object-cover" />
          </div>
          <div className="relative  ml-8">
            <div className="relative w-40 h-40 ">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full rounded-full border-4 border-white "
              />
              <div className="absolute bottom-0 left-0 bg-white text-black px-2 py-1 rounded-lg text-xs font-semibold">{t('social_media')}</div>
            </div>
          </div>
        </div>

        {/* Dark background section (75%) */}
        <div className="w-3/5 h-full bg-slate-800 text-white flex flex-col justify-center p-16">
          <div>
            <div>
            <p className="inline-block text-green-500 text-sm lg:text-lg font-medium mt-4 pr-10">{t('name_label')}</p>
            <p className=" text-sm lg:text-lg inline-block">{t('name')}</p>
            </div>
            <p className="text-green-500  text-sm lg:text-lg font-medium mt-4  inline-block pr-10">{t('country_label')}</p>
            <p className=" text-sm lg:text-lg inline-block ">{t('country_name')}</p>
            <div>
            <p className="text-green-500  text-sm lg:text-lg font-medium mt-4 pr-10 inline-block ">{t('email_address')}</p>
            <p className=" text-sm lg:text-lg inline-block">{t('email')}</p>
            </div>
            <p className="text-green-500  text-sm lg:text-lg font-medium mt-4 pr-10 inline-block">{t('phone_label')}</p>
            <p className=" text-sm lg:text-lg inline-block ">{t('phone')}</p>
          </div>
        </div>
      </div>

      {/* Logout button */}
      <div className="absolute bottom-5 right-5">
        <button 
          onClick={handleLogoutClick}
          className="bg-red-600 text-white px-3 py-1 flex items-center space-x-2
           rounded-lg font-medium border border-white hover:bg-red-700 shadow-xl "
        >
          <img src={IconLogout} alt="Icon Logout" className="h-4 w-4" />
          <span>{t('logout')}</span>
        </button>
      </div>

      {/* Logout Confirmation window */}
      {showLogoutConfirm && (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 `}>
          <div className="bg-white p-6 rounded-3xl shadow-lg w-80 text-center">
            <p className={`text-lg mb-5 font-semibold ${darkMode?`text-black`:``}`}>{t('logout_confirmation')}</p>
            <hr className='border-black border-t w-full mb-4'/>     
            <div className="flex justify-around">
              <button 
                className="text-green-500 px-4 py-2 font-semibold hover:text-green-800"
              >
                <Link to={'/'}>{t('yes')}</Link>
              </button>

      <div className="border-l-2 border-gray-500 w-px max-h-svh"></div>
      
              <button 
                className="text-green-500 px-4 py-2 font-semibold hover:text-green-800"
                onClick={handleCloseLogout}
              >
              {t('no')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile;






