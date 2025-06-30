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

const SetNewPassword = () => {
  const { darkMode } = useContext(ThemeContext);
  const [showSuccess , setShowSuccess] = useState(false);
  const [Invailed, setInvailed] = useState("");
   const [error, setError] = useState("");
     const [isLoading, setIsLoading] = useState(false);
  const [password , setPassword] = useState("");
  const [confirmPassword , setConfirmPassword] = useState("");
  const {t} = useTranslation();
  const navigate = useNavigate();

  // التأكد من وجود التوكن المؤقت عند تحميل الصفحة
  useEffect(() => {
    const resetToken = localStorage.getItem('resetToken');
    if (!resetToken) {
      console.warn("No reset token found, redirecting to forgot password page.");
      navigate('/change-password');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(t('error_message.passwords_mismatch'));
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const passwordData = { password, password_confirmation: confirmPassword };
      await resetPassword(passwordData);

      // بعد النجاح، احذف التوكن المؤقت
      localStorage.removeItem('resetToken');

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/'); // توجيه المستخدم لصفحة تسجيل الدخول
      }, 3000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || t('error_message.reset_failed');
      setError(errorMessage);
      console.error('Password reset failed:', err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen w-screen flex flex-col flex-grow">
      <header className="w-full h-[50px] bg-[#1c5268] "></header>

      <div className="flex flex-grow">
        {/* Left Section*/}
        <div className="hidden lg:w-1/2 lg:flex justify-center items-center relative">
          <LazyLoadImage src={BackgroundImage} alt="Background" className="w-full h-full object-cover" />
          
          <div className="absolute">
            <div className="w-[250px] h-[250px] bg-white rounded-full opacity-80 flex items-center justify-center">
              <LazyLoadImage src={Logo} alt="Logo" className="h-28" />
            </div>
          </div>
        </div>

        {/* Right section change password*/}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
          <h1 className="text-4xl font-bold text-center mb-36">{t('new-password')}</h1>
          <form onSubmit={handleSubmit} className="w-3/4 flex flex-col items-center justify-center">
            <div className="relative mb-12">
              <label className="text-[10px] block mb-2">{t('new-password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="************"
                className={`w-full h-6 px-3 py-3 text-[10px] bg-gray-200 border
                     border-neutral-500 shadow-xl rounded-md ${darkMode?`text-black`:``}`}
                required
              />
            </div>

            <div className="relative mb-12">
              <label className="text-[10px] block mb-2">{t('re-password')}</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="************"
                className={`w-full h-6 px-3 py-3 text-[10px] bg-gray-200 border
                    border-neutral-500 shadow-xl rounded-md ${darkMode?`text-black`:``}`}
                required
              />
            </div>

            <p className="text-[10px] text-center mb-4">
             {t('login-new-password')}
            </p>
            <button
              type="submit"
              className="w-28 h-8 border border-neutral-500 shadow-xl bg-green-500 flex items-center justify-center
               hover:bg-green-600 text-black font-semibold py-2 rounded-lg text-[11px]"
            >
              {t("login")}
            </button>
             {/* Error messsage */}
        {Invailed && (
              <div
                className="flex items-center justify-center 
               border border-red-400 text-red-700 mx-28 py-2 mt-2 rounded-md mb-4"
              >
                <span>
                  <img src={IconError} className="h-5 w-5 mr-2"></img>
                </span>
                <span className="text-sm">{Invailed}</span>
              </div>
            )}
            </form>
        </div>
      </div>
              {/**Success window*/}
       {showSuccess && (
        <div className={`fixed inset-0 flex items-center justify-center   ${darkMode?`bg-gray-800 text-white`:`bg-black bg-opacity-50`}`}>
          <div
            className={` p-4 rounded-2xl shadow-lg text-center fade-in ${darkMode?`bg-gray-800 text-white`:`bg-white`}`}
            style={{
              width: "300px",
              animation: "fadeIn 0.5s",
              borderRadius: "20px",
            }}
          >
            <h2 className={`text-lg font-semibold mb-4 ${darkMode?`text-white`:`text-black`}`}>
              {t("title-of-succsess-changed")}
            </h2>
            <p className={`text-gray-600 mb-2 text-xs ${darkMode?`text-white`:`text-gray-600`}`}>{t("login-new-password")}</p>
            <hr className="w-4/5 border-b-2  border-gray-400 mx-auto my-4" />

            <button
              onClick={() => setShowSuccess(false)}
              className="text-green-600 font-semibold hover:underline text-xs"
            >
              {t("close-success-button")};
            </button>
          </div>
        </div>
      )}
       <button
              type="submit"
              className="w-28 h-8 border border-neutral-500 shadow-xl bg-green-500 flex items-center justify-center hover:bg-green-600 text-black font-semibold py-2 rounded-lg text-[11px]"
              disabled={isLoading}
            >
              {isLoading ? t('loading...') : t("login")}
            </button>

            {/* Error Message Display */}
            {error && (
              <div className="flex items-center justify-center border border-red-400 text-red-700 w-full max-w-xs py-2 mt-2 rounded-md mb-4">
                <img src={IconError} className="h-5 w-5 mr-2" alt="Error Icon" />
                <span className="text-sm">{error}</span>
              </div>
            )}
 {Invailed && (
              <div className="flex items-center justify-center border border-red-400 text-red-700 mx-28 py-2 mt-2 rounded-md mb-4">
                <span>
                  <img src={IconError} className="h-5 w-5 mr-2" alt="Error Icon" />
                </span>
                <span className="text-sm">{Invailed}</span>
              </div>
            )}
    </div>
  );
};
export default SetNewPassword
