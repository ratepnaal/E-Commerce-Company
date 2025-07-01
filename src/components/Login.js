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
import { toast } from 'react-toastify';

const Login = () => {
   const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { login } = useAuth(); // <-- 2. استخدام الـ Hook للحصول على دالة login فقط
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { mockLogin } = useAuth();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    //   toast.success(t('title-of-succsess-login'));
    //   navigate("/landing");
    // } else {
    //   // إذا فشل، الـ Context بيرجع رسالة الخطأ
    //   toast.error(result.error || t('error-message-login-failed'));
    //   setError(result.error);
    // }

    // setIsLoading(false);
    e.preventDefault();
    try {
      mockLogin();
      toast.success(t('title-of-succsess-login'));
      navigate("/landing");
    } catch (err) {
      toast.error(t('error-message-login-failed'));
    }
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  return (
    <div className={`min-h-screen w-full flex flex-col flex-grow ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`w-full h-[50px] ${darkMode ? 'bg-gray-800' : 'bg-[#1c5268]'}`}></header>
      <div className="flex flex-grow">
        {/* Left: Card */}
        <div className="w-full lg:w-6/12 flex flex-col justify-center items-end p-1 lg:pr-20">
          <div className={`w-full max-w-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 flex flex-col items-center`}>
            <LazyLoadImage src={Logo} alt="Logo" className="h-20 mb-6" />
            <h1 className={`text-3xl font-bold text-center mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t("welcome_title")}</h1>
            <p className={`text-lg font-semibold text-center mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t("subtitle")}</p>
            <form
              onSubmit={handleSubmit}
              autoComplete="on"
              className="w-full flex flex-col gap-6"
            >
              {/* Email */}
              <div className="flex flex-col gap-2 w-full">
                <label className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t("email_label")}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    <img src={IconeEmail} alt="email" className="h-5 w-5 opacity-70" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EXAMPLE@GMAIL.COM"
                    className={`h-11 pl-10 pr-4 text-sm ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-black border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full`}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              {/* Password */}
              <div className="flex flex-col gap-2 w-full">
                <label className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t("password_label")}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    <img src={IconPassword} alt="password" className="h-5 w-5 opacity-70" />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="**********"
                    className={`h-11 pl-10 pr-4 text-sm ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-black border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full`}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className={`h-11 w-full mt-4 ${darkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold rounded-lg shadow transition text-lg flex items-center justify-center disabled:opacity-60 border ${darkMode ? 'border-green-900' : 'border-green-500'}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  t('login')
                )}
              </button>
              {/* Helper Links */}
              <div className="mt-4 w-full flex flex-col gap-2">
                {/* Forgot Password Label & Link inline */}
                <div className="flex flex-row items-center justify-center gap-2">
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t("forgot_password_label")}</label>
                  <Link
                    to="/change-password"
                    className={`text-sm font-semibold ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'}`}
                  >
                    {t("forgot_password")}
                  </Link>
                </div>
                {/* Don't Have Account Label & Link inline */}
                <div className="flex flex-row items-center justify-center gap-2">
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{t("dont-have-account-label")}</label>
                  <Link
                    to="/sign-up"
                    className={`text-sm font-semibold underline-offset-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'}`}
                  >
                    {t("signup-label")}
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Right: Animated Images */}
        <div className="hidden lg:flex lg:w-6/12 h-full justify-start pr-4 pt-1">
          <div
            className="w-full h-[600px] max-w-xl rounded-2xl shadow-xl bg-cover bg-center transition-all duration-1000"
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
