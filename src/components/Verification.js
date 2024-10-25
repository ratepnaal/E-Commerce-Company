import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MailPhoto from '../images/verification.png'
import { Link } from 'react-router-dom';

const Verification = ({darkMode , setDarkMode}) => {
    const [Signed , setSigned] = useState(false);
    const handleSigned = ()=>{
        setSigned(true)
    }
    const {t} = useTranslation();
  return (
    <div  className={`flex flex-col items-center justify-center min-h-screen bg-[#F0F8FF] ${darkMode?`bg-gray-900 text-white`:``}`}>
      <div className="relative w-full h-[200px] flex justify-center items-center">
        {/* Background circles */}
        <img src={MailPhoto} alt='Mail photo' className='flex items-center justify-center mb-12'/>
      </div>

      <h2 className="text-2xl font-bold mt-16 mb-2">{t('please_verify_account')}</h2>
      <p className="text-sm text-center mt-2 px-4 font-medium">
        {t('enter_the_6_digit_code')}
      </p>

      {/* Input fields for verification code */}

      <div  className="flex justify-center mt-8 space-x-2">
        {[...Array(6)].map((_, index) => (
          <input
            className="w-10 h-12 border bg-gray-300 rounded-xl  text-center text-lg font-semibold focus:outline-none"
            type="text"
            maxLength="1"
            key={index}
          />
        ))}
      </div>

      <p className="text-sm font-semibold mt-4">{t('valid_for_3_minutes')}</p>

      {/* Resend Code */}
      <p className="text-xs font-medium text-blue-500 cursor-pointer mt-2">{t('resend_code')}</p>

      {/* Verify Button */}
      <button onClick={handleSigned} className="mt-6 w-60 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600">
        {t('verify_and_continue')}
      </button>
      {Signed && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div
      className="bg-white p-6 rounded-3xl shadow-lg w-80 text-center fade-in"
      style={{
        animation: "fadeIn 0.5s",
        borderRadius: "20px",
      }}
    >
      <h2 className="text-lg font-semibold text-black mb-4">{t('signed_up')}</h2>
      <p className="text-gray-600 mb-2 text-xs">
        {t('your_account_is_successfully_verified')}
      </p>
      <hr className="w-4/5 border-b-2 border-gray-400 mx-auto my-4" />

      <button
        onClick={() => setSigned(false)}
        className="text-green-500 font-semibold hover:underline text-xs"
      >
        <Link to="/profile">{t('continue')}</Link>
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Verification;

