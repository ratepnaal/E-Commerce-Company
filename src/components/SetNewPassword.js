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
      toast.error(t('error_message.passwords_mismatch'));
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

      toast.success(t("title-of-succsess-changed"));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/'); // توجيه المستخدم لصفحة تسجيل الدخول
      }, 3000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || t('error_message.reset_failed');
      toast.error(errorMessage);
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
          </form>
        </div>
      </div>
    </div>
  );
};
export default SetNewPassword
