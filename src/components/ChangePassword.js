import React, { useState, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Logo from "../images/logo.svg";
import BackgroundImage from "../images/ImageLogin-6.png";
import { useNavigate } from "react-router-dom";
import IconError from "../images/icons/ERROR.svg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { ThemeContext } from "../contexts/ThemeContext";
import { requestPasswordReset } from "../apiService";

const ChangePassword = () => {
  const { darkMode } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [Invailed, setInvailed] = useState("");
   const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. استدعاء دالة الـ API
      await requestPasswordReset({ email });

      // 2. في حال النجاح، أظهر رسالة النجاح
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // 3. انتقل لصفحة إدخال الكود مع تمرير الإيميل
        navigate("/verify-code", { state: { email } });
      }, 4000);

    } catch (err) {
      // 4. في حال الفشل، اعرض رسالة الخطأ
      const errorMessage = err.response?.data?.message || t("error-cannot-send-code");
      setError(errorMessage);
      console.error("Failed to send password reset code:", err);
    } finally {
      // 5. أوقف حالة التحميل
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col flex-grow">
      <header className="w-full h-[50px] bg-[#1c5268] "></header>

      <div className="flex flex-grow">
        {/* Left Section*/}
        <div className="hidden lg:w-1/2 lg:flex justify-center items-center relative">
          <LazyLoadImage
            src={BackgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />

          <div className="absolute">
            <div className="w-[250px] h-[250px] bg-white rounded-full opacity-80 flex items-center justify-center">
              <LazyLoadImage src={Logo} alt="Logo" className="h-28" />
            </div>
          </div>
        </div>

        {/* Right section change password*/}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
          <h1 className="text-4xl font-bold text-center mb-40">
            {t("change")}
          </h1>

          <form onSubmit={handleSubmit} className="w-3/4">
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2">
                {t("email_label")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EXAMPLE@GMAIL.COM"
                className={`h-6 pl-12 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${
                  darkMode ? `text-black` : ``
                }`}
                required
              />
            </div>

            {Invailed && (
              <div className="flex items-center justify-center border border-red-400 text-red-700 mx-28 py-2 mt-2 rounded-md mb-4">
                <span>
                  <img src={IconError} className="h-5 w-5 mr-2" alt="Error Icon" />
                </span>
                <span className="text-sm">{Invailed}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-28 h-8 border border-neutral-500 shadow-xl bg-green-500 flex items-center justify-center hover:bg-green-600 text-black font-semibold py-2 rounded-lg text-[11px]"
            >
              {t("send")}
            </button>
             <button
              type="submit"
              className="w-28 h-8 border border-neutral-500 shadow-xl bg-green-500 flex items-center justify-center hover:bg-green-600 text-black font-semibold py-2 rounded-lg text-[11px]"
              disabled={isLoading}
            >
              {isLoading ? t('loading...') : t("send-code")}
            </button>
          </form>
        </div>
      </div>

      {/* Success window */}
      {showSuccess && (
        <div className={`fixed inset-0 flex items-center justify-center ${darkMode?`bg-gray-800 text-white`:`bg-black bg-opacity-50`}`}>
          <div
            className={`p-4 rounded-2xl shadow-lg text-center fade-in ${darkMode?`bg-gray-800 text-white`:`bg-white`}`}
            style={{
              width: "300px",
              animation: "fadeIn 0.5s",
              borderRadius: "20px",
            }}
          >
            <h2 className={`text-lg font-semibold mb-4 ${darkMode?`text-white`:`text-black`}`}>
              {t("title-of-succsess-changed")}
            </h2>
            <p className={`text-gray-600 mb-2 text-xs ${darkMode?`text-white`:`text-gray-600`}`}>
              {t("message-of-success-changed")}
            </p>
            <hr className="w-4/5 border-b-2 border-gray-400 mx-auto my-4" />
            <button
              onClick={() => setShowSuccess(false)}
              className="text-green-600 font-semibold hover:underline text-xs"
            >
              {t("close-success-button")}
            </button>
          </div>
        </div>
      )}
      
         {/* Error Message Display */}

            {error && (
              <div className="flex items-center justify-center border border-red-400 text-red-700 w-full max-w-xs py-2 mt-2 rounded-md mb-4">
                <img src={IconError} className="h-5 w-5 mr-2" alt="Error Icon" />
                <span className="text-sm">{error}</span>
              </div>
            )}

    </div>

  );

  
};


export default ChangePassword;


