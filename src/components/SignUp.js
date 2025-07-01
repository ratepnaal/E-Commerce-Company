import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import backgroundSignUp from "../images/bg-signup.png";
import Logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import IconEmail from "../images/icons/ic_outline-email.svg";
import IconPassword from "../images/icons/carbon_password.svg";
import usernameIcon from "../images/icons/username.svg";
import phoneIcon from "../images/icons/phone.svg";
import IconError from "../images/icons/ERROR.svg";
import { useTranslation } from "react-i18next";
import { signUp } from "../apiService";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ThemeContext } from "../contexts/ThemeContext";
import { toast } from 'react-toastify';

const SignUp = () => {
  const { darkMode } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("https://via.placeholder.com/80"); // رابط الصورة الافتراضية
  const navigate = useNavigate();
  const { t } = useTranslation();
  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
  
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setPhoto(base64); // تخزين الصورة بقاعدة 64
      setPreview(base64); // عرض معاينة الصورة
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(t("passwords-dont-match"));
      return;
    }
    try {
      await signUp({ email, password, confirmPassword, phone, username, fullName, country, city, photo });
      toast.success(t("message-of-success-signup"));
    } catch (err) {
      const errorMessage = err.response?.data?.message || t("error-message-signup-failed");
      toast.error(errorMessage);
    }
  };
  return (
    <div className={`min-h-screen w-full flex flex-col flex-grow ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`w-full h-[50px] ${darkMode ? 'bg-gray-800' : 'bg-[#1c5268]'}`}></header>
      <div className="flex flex-grow">
        {/* Left Section */}
        <div className="hidden lg:w-1/2 lg:flex justify-center items-center relative">
          <LazyLoadImage
            src={backgroundSignUp}
            alt="Background"
            className={`w-full h-full object-cover rounded-l-2xl ${darkMode ? 'brightness-75' : ''}`}
          />
          <div className="absolute">
            <div className={`w-[250px] h-[250px] ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-full opacity-80 flex items-center justify-center shadow-xl`}>
              <LazyLoadImage src={Logo} alt="Logo" className="h-20 mb-6" />
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
          <div className={`w-full min-h-screen flex items-center justify-center`}>
            <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 flex flex-col items-center`}>
              <h1 className={`text-3xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t("signup_title")}</h1>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-6"
              >
                {/* Email */}
                <div className="flex flex-col gap-2 w-full">
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t("email_label")}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                      <img src={IconEmail} alt="email" className="h-5 w-5 opacity-70" />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="EXAMPLE@GMAIL.COM"
                      className={`h-11 pl-10 pr-4 text-sm ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-black border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full`}
                      required
                    />
                  </div>
                </div>
                {/* Password */}
                <div className="flex flex-col gap-2">
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t("password_label")}</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="**********"
                    className={`h-11 px-4 text-sm ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-black border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
                    required
                  />
                </div>
                {/* Confirm Password */}
                <div className="flex flex-col gap-2">
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t("confirm_password_label")}</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="**********"
                    className={`h-11 px-4 text-sm ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-black border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
                    required
                  />
                </div>
                {/* Username */}
                <div className="flex flex-col gap-2">
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t("username")}</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Username"
                    className={`h-11 px-4 text-sm ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-black border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
                    required
                  />
                </div>
                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t("phone_number")}</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    className={`h-11 px-4 text-sm ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-black border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
                    required
                  />
                </div>
                {/* Country */}
                <div className="flex flex-col gap-2">
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t("country")}</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    className={`h-11 px-4 text-sm ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-black border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
                    required
                  />
                </div>
                {/* City */}
                <div className="flex flex-col gap-2">
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t("city")}</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className={`h-11 px-4 text-sm ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-black border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition`}
                    required
                  />
                </div>
                {/* Photo Upload */}
                <div className="flex flex-col gap-2 items-center w-full">
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t("images")}</label>
                  <div className="flex items-center gap-4 w-full justify-between">
                    <img
                      src={preview}
                      alt="Preview"
                      className={`w-16 h-16 rounded-full object-cover border-2 shadow ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                    />
                    <button
                      type="button"
                      onClick={handleImageClick}
                      className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-700 text-white hover:bg-blue-800 border border-blue-400' : 'bg-blue-500 text-white hover:bg-blue-600 border border-blue-500'} font-semibold shadow`}
                    >
                      {t("upload") || "Upload"}
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className={`h-11 w-full mt-4 ${darkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold rounded-lg shadow transition text-lg flex items-center justify-center disabled:opacity-60 border ${darkMode ? 'border-green-900' : 'border-green-500'}`}
                >
                  {t("login")}
                </button>
                <div className="mt-4 w-full flex flex-col items-center gap-2">
                  <Link
                    to="/forgot-password"
                    className={`text-sm font-semibold ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'}`}
                  >
                    {t("forgot_password")}
                  </Link>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {t("dont-have-account")}
                    <Link
                      to="/signup"
                      className={`ml-2 font-semibold underline-offset-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'}`}
                    >
                      {t("signup")}
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

