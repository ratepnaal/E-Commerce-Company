import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import MailPhoto from "../images/verification.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Logo from "../images/logo.svg";
import BackgroundImage from "../images/ImageLogin-6.png";
import IconError from "../images/icons/ERROR.svg";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ThemeContext } from "../contexts/ThemeContext";

const Verification = () => {
  const location = useLocation();
  const { darkMode } = useContext(ThemeContext);
  const [signed, setSigned] = useState(false);
  const [error, setError] = useState(""); // حالة لتخزين رسالة الخطأ
  const [code, setCode] = useState(new Array(6).fill("")); // لتخزين كود التفعيل كـ 6 أرقام
  const [resendSuccess, setResendSuccess] = useState(""); // حالة لتخزين رسالة نجاح إعادة الإرسال
  const email = location.state?.email || ""; // الحصول على البريد الإلكتروني من الحالة
  const { t } = useTranslation();
  const navigate = useNavigate();

  // دالة لتحديث كود التفعيل
  const handleCodeChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  // دالة إرسال الطلب إلى API
  const handleSigned = async () => {
    // try {
    //   const verificationCode = code.join(""); // تحويل الكود إلى نص كامل
    //   const formData = new FormData();
    //   formData.append("email", email);
    //   formData.append("code", verificationCode);

    //   const response = await axios.post(
    //     "https://backendsec3.trainees-mad-s.com/api/verify-email",
    //     formData
    //   );

    //   console.log("Verification successful:", response.data);
    //   const token = response.data.token;
    //   localStorage.setItem("authToken", token);
       setSigned(true); // إظهار رسالة النجاح
    // } catch (error) {
    //   console.error("Verification failed:", error);
    //   setError(t("error_message.verification_failed")); // عرض رسالة خطأ عند فشل التحقق
    // }
  };
  // دالة إعادة إرسال الكود
  const handleResendCode = async () => {
    // const token = localStorage.getItem("authToken"); // جلب التوكن من localStorage

    // try {
    //   const formData = new FormData();
    //   formData.append("email", email);
    //   const response = await axios.post(
    //     "https://backendsec3.trainees-mad-s.com/api/resend-verification-code",
    //     formData,
    //     token
    //   );
    //   console.log("Code resent successfully:", response.data);
    //   setResendSuccess(t("code_resent_successfully")); // عرض رسالة نجاح
    // } catch (error) {
    //   console.error("Resend code failed:", error);
    //   setError(t("error_message.resend_failed")); // عرض رسالة خطأ عند فشل إعادة الإرسال
     setResendSuccess(""); // إعادة تعيين رسالة النجاح
    // }
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
            {t("verification_title")}
          </h1>
          <form
            onSubmit={handleSigned}
            className="w-3/4 flex flex-col items-center justify-center"
          >
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2">
                {t("verification_code_label")}
              </label>
              <input
                type="text"
                value={code.join("")}
                onChange={(e) => handleCodeChange(e.target.value, code.indexOf(e.target.value))}
                placeholder="Enter verification code"
                className={`h-6 pl-12 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${
                  darkMode ? `text-black` : ``
                }`}
                required
              />
            </div>

            {error && (
              <div className="flex items-center justify-center border border-red-400 text-red-700 mx-28 py-2 mt-2 rounded-md mb-4">
                <span>
                  <img src={IconError} className="h-5 w-5 mr-2" alt="Error Icon" />
                </span>
                <span className="text-sm">{error}</span>
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
      {signed && (
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
              {t("verification_success_title")}
            </h2>
            <p className={`text-gray-600 mb-2 text-xs ${darkMode?`text-white`:`text-gray-600`}`}>
              {t("verification_success_message")}
            </p>
            <hr className="w-4/5 border-b-2 border-gray-400 mx-auto my-4" />
            <button
              onClick={() => {
                setSigned(false);
                navigate("/");
              }}
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

export default Verification;