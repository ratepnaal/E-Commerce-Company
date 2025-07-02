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
import { toast } from 'react-toastify';

const VerifyResetCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const { darkMode } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const inputRefs = Array.from({ length: 6 }, () => React.createRef());

  // Handle code input change
  const handleCodeChange = (value, idx) => {
    if (!/^[0-9a-zA-Z]?$/.test(value)) return; // Only allow single char
    const newCode = [...code];
    newCode[idx] = value;
    setCode(newCode);
    // Move to next input if value entered
    if (value && idx < 5) {
      inputRefs[idx + 1].current.focus();
    }
    // Move to previous input if deleted
    if (!value && idx > 0) {
      inputRefs[idx - 1].current.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pasted.length) {
      const newCode = code.map((_, i) => pasted[i] || "");
      setCode(newCode);
      // Focus last filled
      const lastIdx = pasted.length - 1;
      if (inputRefs[lastIdx]) inputRefs[lastIdx].current.focus();
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
   
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      toast.error(t("error_message.invalid_code_length"));
      setIsLoading(false);
      return;
    }
    try {
      const response = await verifyPasswordResetCode({ email, code: verificationCode });
      const resetToken = response.data.token;
      localStorage.setItem('resetToken', resetToken);
      toast.success(t("reset_code_success_message"));
      setTimeout(() => {
        navigate('/set-password');
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || t("error_message.verification_failed");
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`h-screen w-screen flex flex-col flex-grow ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`w-full h-[50px] ${darkMode ? 'bg-gray-800' : 'bg-[#1c5268]'}`}></header>
      <div className="flex flex-grow">
        {/* Left Section */}
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
        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
          <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 flex flex-col items-center`}>
            <h1 className={`text-3xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t("verify_reset_code_title") || "Verify Code"}</h1>
            <p className={`text-xs text-center mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t("enter_the_6_digit_code-reset-password") || "Enter the 6-digit code sent to your email."}</p>
            <form onSubmit={handleVerification} className="w-full flex flex-col items-center gap-6">
              <div className="flex flex-row justify-center gap-2 mb-2 w-full">
                {code.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={inputRefs[idx]}
                    type="text"
                    inputMode="text"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleCodeChange(e.target.value, idx)}
                    onPaste={handlePaste}
                    className={`w-12 h-14 text-2xl text-center border rounded-lg shadow focus:ring-2 focus:ring-green-400 transition ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-gray-100 text-black border-gray-300'}`}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>
              <button
                type="submit"
                className={`w-full h-12 mt-2 ${darkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold rounded-lg shadow transition text-lg flex items-center justify-center disabled:opacity-60`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                ) : t('verify') || 'Verify'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyResetCode;

