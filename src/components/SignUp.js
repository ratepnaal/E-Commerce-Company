import React, { useState, useRef } from "react";
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

const SignUp = ({ darkMode, setDarkMode }) => {
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
  const [showModalError, setShowModalError] = useState(false);
  const [showSuccess , setShowSuccess] = useState(false)
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

    e.preventDefault()

    // التحقق من تطابق كلمة المرور

    if (password !== confirmPassword) {
      setInvailed(t("message-error-mismatch"));
      return;
    }

try {                      // send information to api 

  const formData = new FormData();
  formData.append("full_name", fullName);
  formData.append("phone", phone);
  formData.append("address", `${country}, ${city}`);
  formData.append("email", email);
  formData.append("password", password);
      const response =  await signUp(formData);
      localStorage.setItem('email', email);
        localStorage.setItem('username', fullName);
        localStorage.setItem('number' , phone);
        localStorage.setItem('address' , `${country} , ${city}`);
        localStorage.setItem('photo', photo );
      console.log(localStorage.getItem('username'))
      console.log("Sign Up Successful:", response);
        setShowSuccess(true); 
        setTimeout(() => {
          setShowSuccess(false);     // إخفاء النافذة بعد التأخير
          navigate('/verification', { state: { email } });
        }, 4000);            

          // توجيه المستخدم إلى صفحة التحقق مع تمرير البريد الإلكتروني
    } catch (error) {
      console.error("Sign Up Error:", error);
      setInvailed(t("error-message-signup-failed"));
    }
  };
  return (
    <div
      className={`min-h-screen w-full flex flex-col pt-0 m-0 bg-white ${
        darkMode ? `bg-gray-800 text-white` : ``
      }`}
    >
      {/* Header */}
      <header className="w-full h-[45px] bg-[#1c5268] flex flex-shrink-0 "></header>

      <div className="flex flex-grow">
        {/* Left section */}
        <div className="hidden lg:w-1/2 lg:flex justify-center items-center relative">
          <img
            src={backgroundSignUp}
            alt={t("background")}
            className="w-full h-full object-cover"
          />

          {/* Circle */}
          <div className="absolute">
            <div className="w-[250px] h-[250px] bg-white rounded-full opacity-80 flex items-center justify-center">
              <img src={Logo} alt={t("logo")} className="h-28" />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div
          className={`w-full lg:w-1/2 bg-[#f6fff6] flex flex-col justify-center items-center p-8 ${
            darkMode ? `bg-gray-800` : ``
          }`}
        >
          <h1 className="text-4xl font-bold text-center mb-6 uppercase">
            {t("signup")}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-3/4 flex flex-col items-center justify-center"
          >
            {/* Profile photo */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                <div
                  className="w-[80px] h-[80px] bg-gray-300 rounded-full flex items-center justify-center"
                  onClick={handleImageClick}
                >
                  <img
                    src={preview}
                    alt={t("profile_picture")}
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* Email input */}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2 uppercase">
                {t("email_address")}
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
                <img
                  src={IconEmail}
                  alt={t("icon.email")}
                  className="h-4 w-5"
                />
              </span>
            </div>

            {/* Full Name */}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2 uppercase">
                {t("full_name")}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Example User"
                className={`h-6 pl-12 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${
                  darkMode ? `text-black` : ``
                }`}
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img
                  src={usernameIcon}
                  alt={t("icon.username")}
                  className="h-4 w-5"
                />
              </span>
            </div>

            {/* Phone number */}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2 uppercase">
                {t("phone_number")}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+96300000..."
                className={`h-6 pl-12 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${
                  darkMode ? `text-black` : ``
                }`}
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img
                  src={phoneIcon}
                  alt={t("icon.phone")}
                  className="h-4 w-5"
                />
              </span>
            </div>

            {/* Username input */}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2 uppercase">
                {t("username")}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="USERNAME"
                className={`h-6 pl-12 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${
                  darkMode ? `text-black` : ``
                }`}
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img
                  src={usernameIcon}
                  alt={t("icon.username")}
                  className="h-4 w-5"
                />
              </span>
            </div>

            {/* Password */}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2 uppercase">
                {t("password")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**************"
                className={`h-6 pl-12 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${
                  darkMode ? `text-black` : ``
                }`}
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img
                  src={IconPassword}
                  alt={t("icon.password")}
                  className="h-4 w-5"
                />
              </span>
            </div>

            {/* Confirm password */}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2 uppercase">
                {t("re_enter_password")}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="**************"
                className={`h-6 pl-12 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${
                  darkMode ? `text-black` : ``
                }`}
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img
                  src={IconPassword}
                  alt={t("icon.password")}
                  className="h-4 w-5"
                />
              </span>
            </div>

            <div className="flex space-x-4 mb-6">
  {/* Country Dropdown */}
  <div className="relative w-1/2">
    <label className="text-[10px] block mb-2 mt-3 uppercase">{t("country")}</label>
    <input
      type="text"
      readOnly
      className={` h-6 pl-2 py-3 text-[10px] border border-neutral-500 shadow-xl rounded-md cursor-pointer ${
        darkMode ? `text-white bg-gray-800` : `bg-gray-200 text-black`
      }`}
      value={country ? country : t("select_country")}
      onClick={() => document.getElementById("country-select").click()}
    />
    <select
      id="country-select"
      className={`absolute inset-0 opacity-0 cursor-pointer text-[11px]
         ${darkMode?`bg-gray-700 text-white `:`bg-gray-100 text-black`}`}
      value={country}
      onChange={(e) => setCountry(e.target.value)}
    >
      <option value="">{t("select_country")}</option>
      <option value="Syria">{t("syria")}</option>
      <option value="Egypt">{t("egypt")}</option>
      <option value="Jordan">{t("jordan")}</option>
      <option value="Saudi Arabia">{t("saudi-arabia")}</option>
      <option value="Lebanon">{t("lebanon")}</option>
    </select>
  </div>

  {/* City Dropdown */}
  <div className="relative w-1/2">
    <label className="text-[10px] block mb-2 mt-3 uppercase">{t("city")}</label>
    <input
      type="text"
      readOnly
      className={`w-full h-6 pl-2 py-3 text-[10px] border border-neutral-500 shadow-xl rounded-md cursor-pointer ${
        darkMode ? `text-white bg-gray-800` : `bg-gray-200 text-black`
      }`}
      value={city ? city : t("select_city")}
      onClick={() => document.getElementById("city-select").click()}
    />
    <select
      id="city-select"
      className={`absolute inset-0 opacity-0 cursor-pointer text-[11px]
        ${darkMode?`bg-gray-700 text-white `:`bg-gray-100 text-black`}`}
      value={city}
      onChange={(e) => setCity(e.target.value)}
    >
      <option value="">{t("select_city")}</option>
      <option value="Damascus">{t("damascus")}</option>
      <option value="Cairo">{t("cairo")}</option>
      <option value="Amman">{t("amman")}</option>
      <option value="Riyadh">{t("riyadh")}</option>
      <option value="Beirut">{t("beirut")}</option>
    </select>
  </div>
</div>
        {/* Error messsage */}
        {Invailed && (
              <div className="flex items-center justify-center 
               border border-red-400 text-red-700 mx-28 py-2 mt-2 rounded-md mb-4">
             <span><img src={IconError} className="h-5 w-5 mr-2"></img></span> 
                <span className="text-sm">{Invailed}</span>
              </div>
            )}
         {/* Sign up button */}
         <button
              type="submit"
              className="w-28 h-8 border border-neutral-500 shadow-xl bg-green-500 flex items-center justify-center
               hover:bg-green-600 text-black font-semibold py-2 rounded-lg text-[11px]"
            >
              {t("signup-label")}
            </button>

            {/* Already have an account? */}
            <p className="mt-4 text-[10px]">
              {t("already_have_account")}
              {"     "}
              <Link to="/" className="text-[#3071cf] font-medium uppercase">
                {t("login")}
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full h-[45px] bg-[#1c5268] flex flex-shrink-0"></footer>
     {/* ERROR Modal */}
     {showModalError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-2xl shadow-lg text-center fade-in" style={{ width: "300px", animation: "fadeIn 0.5s", borderRadius: "20px" }}>
            <h2 className="text-lg font-semibold text-black mb-4">{t('title')}</h2>
            <p className="text-gray-600 mb-2 text-xs">{t('message')}</p>
            <hr className="w-4/5 border-b-2 border-gray-400 mx-auto my-4" />
            <button
              onClick={() => setShowModalError(false)}
              className="text-red-500 font-semibold hover:underline text-xs"
            >
              {t('dismiss_button')}
            </button>
          </div>
        </div>
      )}
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
              {t("title-of-succsess-sign-up")}
            </h2>
            <p className="text-gray-600 mb-2 text-xs">{t("message-of-success-sign-up")}</p>
            <hr className="w-4/5 border-b-2  border-gray-400 mx-auto my-4" />

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
