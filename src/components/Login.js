import React, { useEffect, useState, useContext } from "react";
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
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ThemeContext } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
   const { darkMode } = useContext(ThemeContext);
  const { login } = useAuth(); // <-- 2. استخدام الـ Hook للحصول على دالة login فقط
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mockLogin } = useAuth();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // State للصور المتحركة
  const [currentImage, setCurrentImage] = useState(0);
  const Images = [Photo1, Photo2, Photo3, Photo4, Photo5, Photo6];

  // تغيير الصور كل 10 دقائق
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % Images.length);
    }, 10000); 
    return () => clearInterval(interval);
  }, [Images]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setIsLoading(true);
    // setError("");

    // // 3. استدعاء دالة login من الـ Context مباشرة
    // const result = await login(email, password);

    // // 4. التحقق من النتيجة اللي رجعت من الـ Context
    // if (result.success) {
    //   // الـ Context هو اللي اهتم بتخزين التوكن وتحديث الحالة
    //   // هون بس منوجه المستخدم للصفحة التالية
    //   navigate("/landing");
    // } else {
    //   // إذا فشل، الـ Context بيرجع رسالة الخطأ
    //   setError(result.error);
    // }

    // setIsLoading(false);
    e.preventDefault();
    mockLogin();
    navigate("/landing");
  };

  return (
    <div className="h-screen w-screen flex flex-col flex-grow">
      {/* Header */}
      <header className="w-full h-[50px] bg-[#1c5268]"></header>
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
                autoComplete="email"
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={IconeEmail} alt="Email Icon" className="h-4 w-5" />
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
                autoComplete="current-password"
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={IconPassword} alt="Password Icon" className="h-4 w-5" />
              </span>
            </div>
     
            {/* Link & Button */}
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
              className="w-28 h-8 border border-neutral-500 shadow-xl bg-green-500 flex items-center justify-center hover:bg-green-600 text-black font-semibold py-2 rounded-lg text-[11px]"
              disabled={isLoading}
            >
              {isLoading ?"..... Loading " : t("login")}
            </button>
             {/* Error Message Display */}
            {error && (
              <div className="flex items-center justify-center border border-red-400 text-red-700 w-full max-w-xs py-2 mt-2 rounded-md mb-4">
                <img src={IconError} className="h-5 w-5 mr-2" alt="Error Icon" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </form>
        </div>

        {/* Right Section */}
        <div className="hidden lg:block lg:w-1/2 h-full pl-20">
          <div
            className="w-full h-full bg-cover bg-center transition-all duration-1000"
            style={{
              backgroundImage: `url(${Images[currentImage]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
             
          ></div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
