import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.svg";
import Photo1 from "../images/ImageLogin-1.png";
import Photo2 from "../images/Image-Login-2.png";
import Photo3 from "../images/ImageLogin-3.png";
import Photo4 from "../images/ImageLogin-4.png";
import Photo5 from "../images/ImageLogin-5.png";
import Photo6 from "../images/ImageLogin-6.png";
import IconeEmail from "../images/icons/ic_outline-email.svg";
import IconPassword from "../images/icons/carbon_password.svg";
import IconError from "../images/icons/ERROR.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import addNotification from "react-push-notification";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import api from "../api";
const Login = ({ darkMode, setDarkMode }) => {
  const username = localStorage.getItem('username')
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const Images = [Photo1, Photo2, Photo3, Photo4, Photo5, Photo6];
  const [showModalError, setShowModalError] = useState(false);
  const [Invailed, setInvailed] = useState("");
  const [showSuccess , setShowSuccess] = useState(false);
  const handleNotification = () => {
    // طلب الإذن من المستخدم
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        addNotification({
          title: 'Welcome Back 🎉',
          message: `Hello ${username} ! `,
          duration: 4000,
          native: true,
          icon: Logo,
          onClick: () => console.log("Push Notification!")
        });
      } else {
        console.log("Notification permission denied");
      }
    });
  };
  // Images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % Images.length);
    }, 10000); //change after 10 minutes
    return () => clearInterval(interval);
  }, [Images.length]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ارسال البيانات للداتابيز عندما كان السيرفر يعمل 
    // try {
    //   const credentials = { email, password };
    //   const response = await api.post('/login', credentials);
    //   console.log("login successfully " , response)

    //   const { accessToken, refreshToken } = response.data;
    //   localStorage.setItem('accessToken', accessToken);
    //   localStorage.setItem('refreshToken', refreshToken);
    //   localStorage.setItem('email',email); 
    //   // عرض نافذة النجاح
      setShowSuccess(true);
      handleNotification();   
      // تأخير التنقل حتى تظهر نافذة النجاح
      setTimeout(() => {
        setShowSuccess(false);     // إخفاء النافذة بعد التأخير
        navigate("/profile");
      }, 4000);                 // تأخير لمدة ثانيتين
    // } catch (error) {
    //   setInvailed(t("error-message-login-failed"));
    //   setShowModalError(true);
    // }
  };
  
  const { t } = useTranslation();

  return (
    <div className=" h-screen w-screen flex flex-col flex-grow ">

      {/* Header*/}
      <header className="w-full h-[50px] bg-[#1c5268] "></header>
      <div className="flex flex-grow">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
          <h1 className="text-6xl font-bold text-center mb-2">
            {t("welcome_title")}
          </h1>
          <p className="text-3xl font-semibold text-center mb-8">
            {t("subtitle")}
          </p>
          <LazyLoadImage src={Logo} alt="Logo" className="h-16 mb-8" />
          <form
            onSubmit={handleSubmit}
            autoComplete="on"
            className="w-3/4 flex flex-col items-center justify-center"
          >
            {/* Email*/}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2">
                {t("email_label")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EXAMPLE@GMAIL.COM"
                className={`h-6 pl-12 py-3 text-[10px] 
                 bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${
                   darkMode ? `text-black` : ``
                 }`}
                required
                autoComplete="email"
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={IconeEmail} alt="Email Icon" className="h-4 w-5" />
              </span>
            </div>

            {/* Password*/}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2">
                {t("password_label")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
                className={`h-6 pl-12 py-3 text-[10px] 
                  bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${
                    darkMode ? `text-black` : ``
                  }`}
                required
                autoComplete="current-password"
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img
                  src={IconPassword}
                  alt="Password Icon"
                  className="h-4 w-5"
                />
              </span>
            </div>
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
            {/*Link & Button */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="text-center">
                <h4 className="text-[11px] inline">{t("dont-have")}</h4>
                <Link
                  to={"/sign-up"}
                  className="text-[11px] text-blue-500 hover:underline ml-2"
                >
                  {t("signup-label")}
                </Link>
              </div>
              <div className="text-center mt-2">
                <h4 className="text-[11px] inline">{t("forget")}</h4>
                <Link
                  to={"/change-password"}
                  className="text-[11px] text-blue-500 hover:underline ml-2"
                >
                  {t("change")}
                </Link>
              </div>
            </div>
            <button
              type="submit"
              className="w-28 h-8 border border-neutral-500 shadow-xl bg-green-500 flex items-center justify-center
               hover:bg-green-600 text-black font-semibold py-2 rounded-lg text-[11px]"
            >
              {t("login")}
            </button>
          </form>
        </div>

        {/*Right Section */}
        <div className="hidden lg:block lg:w-1/2 h-full pl-20">
          {" "}
          {/**Hide this section in small screen */}
          <div
            className="w-full h-full bg-cover bg-center transition-all duration-1000"
            style={{
              backgroundImage: `url(${Images[currentImage]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
          </div>
        </div>
      </div>
      {/**ERROR window*/}
      {showModalError && (
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
              {t("title")}
            </h2>
            <p className="text-gray-600 mb-2 text-xs">{t("message")}</p>
            <hr className="w-4/5 border-b-2  border-gray-400 mx-auto my-4" />

            <button
              onClick={() => setShowModalError(false)}
              className="text-red-500 font-semibold hover:underline text-xs"
            >
              {t("dismiss_button")}
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
              {t("title-of-succsess-login")}
            </h2>
            <p className="text-gray-600 mb-2 text-xs">{t("message-of-success-login")}</p>
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

export default Login;
