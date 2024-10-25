import React, { useState } from 'react';
import backgroundSignUp from "../images/bg-signup.png"; 
import Logo from "../images/logo.svg"; 
import { Link } from "react-router-dom";
import Button from './Button';
import IconEmail from '../images/icons/ic_outline-email.svg';
import IconPassword from '../images/icons/carbon_password.svg';
import username from '../images/icons/username.svg';
import phone from '../images/icons/phone.svg';
import IconError from '../images/icons/ERROR.svg';
import { useTranslation } from 'react-i18next';

const SignUp = ({ darkMode, setDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Invailed, setInvailed] = useState("");
  const [showModalError, setShowModalError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModalError(true);
    setTimeout(() => {
      setShowModalError(false);
    }, 5000);
    if (!password || !email) {
      setInvailed(t('error_message.empty_fields'));
    } else if (email !== "example@gmail.com" || password !== "12345678") {
      setInvailed(t('error_message.invalid_credentials'));
    } else {
      setInvailed("");
    }  
  };

  const { t } = useTranslation();

  return (
    <div className={`min-h-screen w-full flex flex-col pt-0 m-0 bg-white ${darkMode ? `bg-gray-800 text-white` : ``}`}>
      {/* Header */}
      <header className="w-full h-[45px] bg-[#1c5268] flex flex-shrink-0 "></header>  

      <div className="flex flex-grow">
        {/* Left section */}
        <div className="hidden lg:w-1/2 lg:flex justify-center items-center relative">
          <img src={backgroundSignUp} alt={t('background')} className="w-full h-full object-cover" />
          
          {/* Circle */}
          <div className="absolute">
            <div className="w-[250px] h-[250px] bg-white rounded-full opacity-80 flex items-center justify-center">
              <img src={Logo} alt={t('logo')} className="h-28" />
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className={`w-full lg:w-1/2 bg-[#f6fff6] flex flex-col justify-center items-center p-8 ${darkMode ? `bg-gray-800` : ``}`}>
          <h1 className="text-4xl font-bold text-center mb-6 uppercase">{t('signup')}</h1>
          <form onSubmit={handleSubmit} className="w-3/4 flex flex-col items-center justify-center">
            
            {/* Profile photo */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                <div className="w-[80px] h-[80px] bg-gray-300 rounded-full flex items-center justify-center">
                  <img
                    src="https://via.placeholder.com/80" 
                    alt={t('profile_picture')}
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Email input */}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2 uppercase">{t('email_address')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EXAMPLE@GMAIL.COM"
                className={`h-6 pl-12 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${darkMode ? `text-black` : ``}`}
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={IconEmail} alt={t('icon.email')} className="h-4 w-5" />
              </span>
            </div>

            {/* Phone number */}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2 uppercase">{t('phone_number')}</label>
              <input
                type="text"
                placeholder="+96300000..."
                className={`h-6 pl-12 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${darkMode ? `text-black` : ``}`}
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={phone} alt={t('icon.phone')} className="h-4 w-5" />
              </span>
            </div>

            {/* Username input */}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2 uppercase">{t('username')}</label>
              <input
                type="text"
                placeholder="USERNAME"
                className={`h-6 pl-12 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${darkMode ? `text-black` : ``}`}
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={username} alt={t('icon.username')} className="h-4 w-5" />
              </span>
            </div>

            {/* Password */}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2 uppercase">{t('password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**************"
                className={`h-6 pl-12 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${darkMode ? `text-black` : ``}`}
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={IconPassword} alt={t('icon.password')} className="h-4 w-5" />
              </span>
            </div>

            {/* Confirm password */}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2 uppercase">{t('re_enter_password')}</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="**************"
                className={`h-6 pl-12 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${darkMode ? `text-black` : ``}`}
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={IconPassword} alt={t('icon.password')} className="h-4 w-5" />
              </span>
            </div>

            {/* Country and City */}
            <div className="flex space-x-4 mb-6">
              <div className="relative w-1/2">
                <label className="text-[10px] block mb-2 mt-3 uppercase">{t('country')}</label>
                <select className={`w-full h-6 pl-2 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${darkMode ? `text-black` : ``}`} required>
                  <option value="" disabled selected>{t('select_country')}</option>
                  <option value="Syria">{t('syria')}</option>
                  <option value="Egypt">{t('egypt')}</option>
                  <option value="Jordan">{t('jordan')}</option>
                  <option value="Saudi Arabia">{t('saudi-arabia')}</option>
                  <option value="Lebanon">{t('lebanon')}</option>
                </select>
              </div>

              <div className="relative w-1/2">
                <label className="text-[10px] block mb-2 mt-3 uppercase">{t('city')}</label>
                <select className={`w-full h-6 pl-2 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${darkMode ? `text-black` : ``}`} required>
                  <option value="" disabled selected>{t('select_city')}</option>
                  <option value="Damascus">{t('damascus')}</option>
                  <option value="Cairo">{t('cairo')}</option>
                  <option value="Amman">{t('amman')}</option>
                  <option value="Riyadh">{t('riyadh')}</option>
                  <option value="Beirut">{t('beirut')}</option>
                </select>
              </div>
            </div>

            {/* Error message */}
            {Invailed && (
              <div className="text-red-500 text-xs mb-4 flex items-center uppercase">
                <img src={IconError} alt={t('icon.error')} className="h-4 w-4 mr-1" />
                {Invailed}
              </div>
            )}

            {/* Sign up button */}
            <Button link0="/verification" text={t('signup-label')} className="mt-4 px-4 py-2 bg-[#42a045] text-white text-sm font-semibold rounded-full shadow-md hover:bg-[#4da94d] transition duration-200 ease-in-out">
              </Button>

            {/* Already have an account? */}
            <p className="mt-4 text-[10px]">
              {t('already_have_account')}{"     "}
              <Link to="/" className="text-[#3071cf] font-medium uppercase">{t('login')}</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full h-[45px] bg-[#1c5268] flex flex-shrink-0"></footer>

      {/* Modal */}
      {showModalError && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-700 rounded-lg p-6">
            <p className="text-red-500 dark:text-red-400">{Invailed}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
