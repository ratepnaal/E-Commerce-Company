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
import { toast } from 'react-toastify';

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
      await requestPasswordReset({ email });
      toast.success(t("message-of-success-changed"));
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/verify-code", { state: { email } });
      }, 4000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || t("error-cannot-send-code");
      toast.error(errorMessage);
      setError(errorMessage);
      console.error("Failed to send password reset code:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`h-screen w-screen flex flex-col flex-grow ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`w-full h-[50px] ${darkMode ? 'bg-gray-800' : 'bg-[#1c5268]'}`}></header>
      <div className="flex flex-grow">
        {/* Left Section*/}
        <div className="hidden lg:w-1/2 lg:flex justify-center items-center relative">
          <LazyLoadImage
            src={BackgroundImage}
            alt="Background"
            className={`w-full h-full object-cover rounded-l-2xl ${darkMode ? 'brightness-75' : ''}`}
          />
          <div className="absolute">
            <div className={`w-[250px] h-[250px] ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-full opacity-80 flex items-center justify-center shadow-xl`}>
              <LazyLoadImage src={Logo} alt="Logo" className="h-28" />
            </div>
          </div>
        </div>
        {/* Right section change password*/}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
          <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 flex flex-col items-center`}>
            <h1 className={`text-3xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {t("change")}
            </h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  {t("email_label")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EXAMPLE@GMAIL.COM"
                  className={`h-11 px-4 text-sm ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-black border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
                  required
                />
              </div>
              <div className="flex flex-row gap-4 justify-between mt-2">
                <button
                  type="submit"
                  className={`flex-1 h-11 ${darkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold rounded-lg shadow transition text-sm flex items-center justify-center disabled:opacity-60`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  ) : t("send-code")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;


