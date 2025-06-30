import React, { useState, useContext } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.svg";
import BackgroundImage from "../images/ImageLogin-6.png";
import IconError from "../images/icons/ERROR.svg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ThemeContext } from "../contexts/ThemeContext";
import { verifyPasswordResetCode } from "../apiService";

const VerifyResetCode = () => {
   const [code, setCode] = useState(new Array(6).fill(''));
  const { darkMode } = useContext(ThemeContext);
  const [resetCode, setResetCode] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [Invailed, setInvailed] = useState("");
   const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState('');
      const [signed, setSigned] = useState(false);
      const [email , setEmail] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

   const handleVerification = async () => {
        setIsLoading(true);
        setError('');

        const verificationCode = code.join('');
        if (verificationCode.length !== 6) {
            setError(t("error_message.invalid_code_length")); // أضف هذه الترجمة لملفات اللغة
            setIsLoading(false);
            return;
        }

        try {
            const response = await verifyPasswordResetCode({ email, code: verificationCode });
            
            // في حال النجاح، الـ API يفترض أن يرجع توكن مؤقت لاستخدامه في الخطوة التالية
            const resetToken = response.data.token; // افترض أن التوكن يرجع بهذا الشكل
            localStorage.setItem('resetToken', resetToken); // تخزين التوكن
            
            setSigned(true); // إظهار رسالة النجاح
            setTimeout(() => {
                setSigned(false);
                navigate('/set-password'); // توجيه المستخدم لصفحة تعيين كلمة المرور الجديدة
            }, 3000);

        } catch (err) {
            const errorMessage = err.response?.data?.message || t("error_message.verification_failed");
            setError(errorMessage);
            console.error("Code verification failed:", err);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="h-screen w-screen flex flex-col flex-grow">
      <header className="w-full h-[50px] bg-[#1c5268]"></header>

      <div className="flex flex-grow">
        {/* Left Section */}
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

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            {t("verify_reset_code_title")}
          </h1>
          <form
            onSubmit={handleVerification}
            className="w-3/4 flex flex-col items-center justify-center"
          >
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2">
                {t("reset_code_label")}
              </label>
              <input
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                placeholder="Enter reset code"
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
              {t("verify")}
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
              {t("reset_code_success_title")}
            </h2>
            <p className={`text-gray-600 mb-2 text-xs ${darkMode?`text-white`:`text-gray-600`}`}>
              {t("reset_code_success_message")}
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
       {error && (
                <p className="text-red-500 text-xs font-semibold mt-4">{error}</p>
            )}
 {/* زر التحقق */}
            <button 
                onClick={handleVerification} 
                className="mt-6 w-60 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
                disabled={isLoading}
            >
                {isLoading ? t('loading...') : t('verify_and_continue')}
            </button>

    </div>
  );
};

export default VerifyResetCode;

