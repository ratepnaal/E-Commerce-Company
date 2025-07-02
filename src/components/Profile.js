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
import { useAuth } from "../contexts/AuthContext";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { darkMode } = useContext(ThemeContext);
  const { user , logout } = useAuth(); // <-- الحصول على المستخدم ودالة الخروج من AuthContext
  
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();


  const handleLogout = () => {
    toast.success(t('logout_success_message') || 'Logged out successfully');
    logout();
    navigate("/");
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleCloseLogout = () => {
    setShowLogoutConfirm(false);
  };
 
  // في حال لم يتم تحميل بيانات المستخدم بعد، أو المستخدم غير مسجل دخوله
  // (مع أن PrivateRoute يفترض أن يمنع هذا)
  if (!user) {
    return <div>Loading user profile...</div>; // أو أي مؤشر تحميل آخر
  }

  // 4. استخدام بيانات المستخدم من الـ user object مباشرة
  const { full_name, email, address, photo , number } = user;


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
            <div className={`w-32 h-32 rounded-full border-4 ${darkMode ? 'border-gray-900' : 'border-white'} overflow-hidden shadow-xl bg-gray-200`}>
              <LazyLoadImage
                src={photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`absolute top-4 right-4 px-4 py-2 rounded-lg flex items-center shadow transition font-semibold text-sm
              ${darkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
          >
            <img src={IconLogout} alt="Logout" className="w-5 h-5 mr-2" />
            {t('logout')}
          </button>
        </div>

        {/* Profile Info */}
        <div className={`mt-20 p-8 rounded-2xl shadow-xl border transition-all
          ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}>
          <h1 className="text-2xl font-bold mb-6 text-center tracking-wide">{full_name}</h1>
          <div className="space-y-6">
            <div>
              <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('email')}</label>
              <p className="font-semibold text-base break-all">{email}</p>
            </div>
            <div>
              <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('phone')}</label>
              <p className="font-semibold text-base break-all">{number}</p>
            </div>
            <div>
              <label className={`block text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('address')}</label>
              <p className="font-semibold text-base break-all">{address}</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Profile;