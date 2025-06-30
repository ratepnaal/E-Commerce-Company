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
  const [Invailed, setInvailed] = useState("");
  const [preview, setPreview] = useState("https://via.placeholder.com/80"); // رابط الصورة الافتراضية
  const [showSuccess, setShowSuccess] = useState(false);
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
      setInvailed(t("passwords-dont-match"));
      return;
    }
    setShowSuccess(true);
  };
  return (
    <div className="h-screen w-screen flex flex-col flex-grow">
      <header className="w-full h-[50px] bg-[#1c5268]"></header>
      <div className="flex flex-grow">
        {/* Left Section */}
        <div className="hidden lg:w-1/2 lg:flex justify-center items-center relative">
          <LazyLoadImage
            src={backgroundSignUp}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute">
            <div className="w-[250px] h-[250px] bg-white rounded-full opacity-80 flex items-center justify-center">
              <LazyLoadImage src={Logo} alt="Logo" className="h-28" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            {t("signup_title")}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-3/4 flex flex-col items-center justify-center"
          >
            {/* Email */}
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
              <span className="absolute top-7 left-3 flex items-center">
                <img src={IconEmail} alt="Email Icon" className="h-4 w-5" />
              </span>
            </div>

            {/* Password */}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2">
                {t("password_label")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
                className={`h-6 pl-12 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${
                  darkMode ? `text-black` : ``
                }`}
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={IconPassword} alt="Password Icon" className="h-4 w-5" />
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2">
                {t("confirm_password_label")}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="**********"
                className={`h-6 pl-12 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${
                  darkMode ? `text-black` : ``
                }`}
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={IconPassword} alt="Password Icon" className="h-4 w-5" />
              </span>
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
              {t("signup")}
            </button>

            <div className="mt-4 text-center">
              <span className="text-[11px]">{t("already-have-account")}</span>
              <Link
                to="/"
                className="text-[11px] text-blue-500 hover:underline ml-2"
              >
                {t("login")}
              </Link>
            </div>
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
              {t("title-of-succsess-signup")}
            </h2>
            <p className={`text-gray-600 mb-2 text-xs ${darkMode?`text-white`:`text-gray-600`}`}>
              {t("message-of-success-signup")}
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
    </div>
  );
};

export default SignUp;

