import React, { useState  } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Logo from '../images/logo.svg';
import BackgroundImage from '../images/ImageLogin-6.png'; 
import { useNavigate  } from 'react-router-dom';
import IconError from "../images/icons/ERROR.svg";
const SetNewPassword = (darkMode , setDarkMode) => {
  const [showSuccess , setShowSuccess] = useState(false);
  const [Invailed, setInvailed] = useState("");
  const [password , setPassword] = useState("");
  const [confirmPassword , setConfirmPassword] = useState("");
  const {t} = useTranslation();
  const navigate = useNavigate();
  const handleSubmit = async (e)=> {
    const token = localStorage.getItem('authToken');
    e.preventDefault();

  
    // تحقق من مطابقة كلمتي المرور
    if (password !== confirmPassword) {
      setInvailed(t('error_message.passwords_mismatch'));
      return;
    }

    try {
      // إعداد بيانات الطلب
      const formData = new FormData();
      formData.append('password', password);
      formData.append('password_confirmation', confirmPassword);

      // إرسال الطلب إلى API لتحديث كلمة المرور
      await axios.post(
        'https://backendsec3.trainees-mad-s.com/api/user/password/reset-password',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      localStorage.removeItem('authToken');
      // عرض رسالة نجاح
      setShowSuccess(true);
      setInvailed("");
     
      
      // إعادة التوجيه إلى صفحة تسجيل الدخول بعد نجاح التحديث
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/');
      }, 3000);

    } catch (error) {
      console.error('Password reset failed:', error);
      setInvailed(t('error_message.reset_failed'));
    }
  };
  return (
    <div className="h-screen w-screen flex flex-col flex-grow">
      <header className="w-full h-[50px] bg-[#1c5268] "></header>

      <div className="flex flex-grow">
        {/* Left Section*/}
        <div className="hidden lg:w-1/2 lg:flex justify-center items-center relative">
          <img src={BackgroundImage} alt="Background" className="w-full h-full object-cover" />
          
          <div className="absolute">
            <div className="w-[250px] h-[250px] bg-white rounded-full opacity-80 flex items-center justify-center">
              <img src={Logo} alt="Logo" className="h-28" />
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white p-4 rounded-2xl shadow-lg text-center fade-in"
            style={{
              width: "300px",
              animation: "fadeIn 0.5s",
              borderRadius: "20px",
            }}
          >
            <h2 className="text-lg font-semibold text-black mb-4">
              {t("title-of-succsess-changed")}
            </h2>
            <p className="text-gray-600 mb-2 text-xs">{t("login-new-password")}</p>
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
    </div>
  );
};
export default SetNewPassword