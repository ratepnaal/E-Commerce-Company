import React, { useState, useContext  , useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Logo from '../images/logo.svg';
import BackgroundImage from '../images/ImageLogin-6.png'; 
import { useNavigate  } from 'react-router-dom';
import IconError from "../images/icons/ERROR.svg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ThemeContext } from "../contexts/ThemeContext";
import { resetPassword } from "../apiService";
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const SetNewPassword = () => {
  const { darkMode } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  // التأكد من وجود التوكن المؤقت عند تحميل الصفحة
  
  // useEffect(() => {
  //   const resetToken = localStorage.getItem('resetToken');
  //   if (!resetToken) {
  //     console.warn("No reset token found, redirecting to forgot password page.");
  //     navigate('/change-password');
  //   }
  // }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(t('error_message.passwords_mismatch'));
      return;
    }
    setIsLoading(true);
    try {
      const passwordData = { password, password_confirmation: confirmPassword };
      await resetPassword(passwordData);
      localStorage.removeItem('resetToken');
      toast.success(t("title-of-succsess-changed"));
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || t('error_message.reset_failed');
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`h-screen w-screen flex flex-col flex-grow ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`w-full h-[50px] ${darkMode ? 'bg-gray-800' : 'bg-[#1c5268]'}`}></header>
      <div className="flex flex-grow">
        {/* Left Section */}
        <div className="hidden lg:w-1/2 lg:flex justify-center items-center relative">
          <LazyLoadImage src={BackgroundImage} alt="Background" className={`w-full h-full object-cover rounded-l-2xl ${darkMode ? 'brightness-75' : ''}`} />
          <div className="absolute">
            <div className={`w-[250px] h-[250px] ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-full opacity-80 flex items-center justify-center shadow-xl`}>
              <LazyLoadImage src={Logo} alt="Logo" className="h-28" />
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
          <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 flex flex-col items-center`}>
            <h1 className={`text-3xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t('new-password')}</h1>
            <p className={`text-xs text-center mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('login-new-password')}</p>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
              <div className="flex flex-col gap-2 w-full">
                <label className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('new-password')}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="************"
                  className={`h-11 px-4 text-sm ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-black border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition w-full`}
                  required
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t('re-password')}</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="************"
                  className={`h-11 px-4 text-sm ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-black border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition w-full`}
                  required
                />
              </div>
              <button
                type="submit"
                className={`h-12 w-full mt-4 ${darkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold rounded-lg shadow transition text-lg flex items-center justify-center disabled:opacity-60 border ${darkMode ? 'border-green-900' : 'border-green-500'}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                ) : (
                  t('login')
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SetNewPassword
