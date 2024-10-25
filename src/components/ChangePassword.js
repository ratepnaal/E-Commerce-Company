import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../images/logo.svg';
import BackgroundImage from '../images/ImageLogin-6.png'; 
import Button from './Button';
const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const {t} = useTranslation();
  return (
    <div className="h-screen w-screen flex flex-col flex-grow">
      <header className="w-full h-[50px] bg-[#1c5268] "></header>

      <div className="flex flex-grow">
        {/* Lift Section*/}
        <div className="hidden lg:w-1/2 lg:flex justify-center items-center relative">
          <img src={BackgroundImage} alt="Background" className="w-full h-full object-cover" />
          
          <div className="absolute">
            <div className="w-[250px] h-[250px] bg-white rounded-full opacity-80 flex items-center justify-center">
              <img src={Logo} alt="Logo" className="h-28" />
            </div>
          </div>
        </div>

        {/* Right section change password*/}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
          <h1 className="text-4xl font-bold text-center mb-16">{t('change')}</h1>
          <form onSubmit={handleSubmit} className="w-3/4 flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2">{t('email_label')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EXAMPLE@GMAIL.COM"
                className="w-full h-6 px-3 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md"
                required
              />
            </div>

            <div className="relative mb-6">
              <label className="text-[10px] block mb-2">{t('password_label')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="************"
                className="w-full h-6 px-3 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md"
                required
              />
            </div>

            <div className="relative mb-6">
              <label className="text-[10px] block mb-2">{t('re-password')}</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="************"
                className="w-full h-6 px-3 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md"
                required
              />
            </div>

            <p className="text-[10px] text-center mb-4">
             {t('send-verification-code')}
            </p>
            <Button text={"SEND CODE"} link0={'/verification'}></Button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
