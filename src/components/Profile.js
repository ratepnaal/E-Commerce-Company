import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import profileImage from "../images/profile-image.png";
import BackgroundShadow from "../images/shadow-of-background.png";
import BackgroundProfile from "../images/Background-profile.png";
import Lawn from "../images/the lawn.png";
import Header from "../landing components/Header";
import IconLogout from "../images/icons/Logout.svg";
import DarkModeToggle from "./DarkModeToggle";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ThemeContext } from '../contexts/ThemeContext';

const Profile = () => {
  const { darkMode } = useContext(ThemeContext);
  const email = localStorage.getItem('email') || "example@example.com";
  const full_name = localStorage.getItem('username') || "اسم المستخدم";
  const number = localStorage.getItem('number') || "123456789";
  const address = localStorage.getItem('address') || "عنوان المستخدم";
  const photo = localStorage.getItem('photo') || profileImage;

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleCloseLogout = () => {
    setShowLogoutConfirm(false);
  };

  const { t } = useTranslation();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      <Header />
      <DarkModeToggle />
      
      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="relative">
          {/* Background Image */}
          <div className="relative h-48 md:h-64">
            <LazyLoadImage
              src={BackgroundProfile}
              alt="Background"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
          </div>

          {/* Profile Image */}
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
              <LazyLoadImage
                src={photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogoutClick}
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <img src={IconLogout} alt="Logout" className="w-5 h-5 mr-2" />
            {t('logout')}
          </button>
        </div>

        {/* Profile Info */}
        <div className="mt-20 p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">{full_name}</h1>
          <div className="space-y-4">
            <div>
              <label className="text-gray-600">{t('email')}</label>
              <p className="font-semibold">{email}</p>
            </div>
            <div>
              <label className="text-gray-600">{t('phone')}</label>
              <p className="font-semibold">{number}</p>
            </div>
            <div>
              <label className="text-gray-600">{t('address')}</label>
              <p className="font-semibold">{address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-bold mb-4">{t('confirm_logout')}</h2>
            <p className="mb-4">{t('logout_message')}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseLogout}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                {t('logout')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;