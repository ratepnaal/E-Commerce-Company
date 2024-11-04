import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MailPhoto from "../images/verification.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const Verification = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
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
    try {
      const verificationCode = code.join(""); // تحويل الكود إلى نص كامل
      const formData = new FormData();
      formData.append("email", email);
      formData.append("code", verificationCode);

      const response = await axios.post(
        "https://backendsec3.trainees-mad-s.com/api/verify-email",
        formData
      );

      console.log("Verification successful:", response.data);
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      setSigned(true); // إظهار رسالة النجاح
    } catch (error) {
      console.error("Verification failed:", error);
      setError(t("error_message.verification_failed")); // عرض رسالة خطأ عند فشل التحقق
    }
  };
  // دالة إعادة إرسال الكود
  const handleResendCode = async () => {
    const token = localStorage.getItem("authToken"); // جلب التوكن من localStorage

    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await axios.post(
        "https://backendsec3.trainees-mad-s.com/api/resend-verification-code",
        formData,
        token
      );
      console.log("Code resent successfully:", response.data);
      setResendSuccess(t("code_resent_successfully")); // عرض رسالة نجاح
    } catch (error) {
      console.error("Resend code failed:", error);
      setError(t("error_message.resend_failed")); // عرض رسالة خطأ عند فشل إعادة الإرسال
      setResendSuccess(""); // إعادة تعيين رسالة النجاح
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-[#F0F8FF] ${
        darkMode ? "bg-gray-900 text-white" : ""
      }`}
    >
       <LazyLoadComponent >
      <div className="relative w-full h-[200px] flex justify-center items-center">
        <img
          src={MailPhoto}
          alt="Mail photo"
          className="flex items-center justify-center mb-12"
        />
      </div>

      <h2 className="text-2xl font-bold mt-16 mb-2">
        {t("please_verify_account")}
      </h2>
      <p className="text-sm text-center mt-2 px-4 font-medium">
        {t("enter_the_6_digit_code")}
      </p>

      {/* حقول إدخال كود التفعيل */}
      <div className="flex justify-center mt-8 space-x-2">
        {code.map((digit, index) => (
          <input
            key={index}
            className="w-10 h-12 border bg-gray-300 rounded-xl text-center text-lg font-semibold focus:outline-none"
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleCodeChange(e.target.value, index)}
          />
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-xs font-semibold mt-4">{error}</p>
      )}

      {resendSuccess && (
        <p className="text-green-500 text-xs font-semibold mt-4">
          {resendSuccess}
        </p>
      )}

      <p className="text-sm font-semibold mt-4">{t("valid_for_3_minutes")}</p>
      <p
        className="text-xs font-medium text-blue-500 cursor-pointer mt-2"
        onClick={handleResendCode}
      >
        {" "}
        {t("resend_code")}{" "}
      </p>

      {/* زر التحقق */}
      <button
        onClick={handleSigned}
        className="mt-6 w-60 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        {t("verify_and_continue")}
      </button>

      {signed && (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 `}>
          <div
            className={` p-6 rounded-3xl shadow-lg w-80 text-center fade-in ${darkMode?`bg-gray-800 text-white`:`bg-white`}`}
            style={{ animation: "fadeIn 0.5s", borderRadius: "20px" }}
          >
            <h2 className={`text-lg font-semibold  mb-4 ${darkMode?`text-white`:`text-black`}`}>
              {t("signed_up")}
            </h2>
            <p className={` mb-2 text-xs ${darkMode?`text-white`:`text-gray-600`}`}>
              {t("your_account_is_successfully_verified")}
            </p>
            <hr className="w-4/5 border-b-2 border-gray-400 mx-auto my-4" />
            <button
              onClick={() => {
                setSigned(false);
                navigate("/");
              }}
              className="text-green-500 font-semibold hover:underline text-xs"
            >
              {t("continue")}
            </button>
          </div>
        </div>
      )}
      </LazyLoadComponent>
    </div>
  );
};

export default Verification;
