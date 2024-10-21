import React, { useState } from 'react';
import backgroundSignUp from "../images/bg-signup.png"; 
import Logo from "../images/logo.svg"; 
import { Link } from "react-router-dom";
import Button from './Button';
import IconEmail from '../images/icons/ic_outline-email.svg'
import IconPassword from '../images/icons/carbon_password.svg'
import username from '../images/icons/username.svg'
import phone from '../images/icons/phone.svg'
import IconError from '../images/icons/ERROR.svg'
const SignUp = () => {
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
      setInvailed("Fields cannot be empty");
    } else if (email !== "example@gmail.com" || password !== "12345678") {
      setInvailed("Your email/password are invalid");
    } else {
      setInvailed("");
    }  
  };

  return (
    <div className="min-h-screen w-full flex flex-col pt-0 m-0">
      {/* Header*/}
      <header className="w-full h-[45px] bg-[#1c5268] flex flex-shrink-0 "></header>

      <div className="flex flex-grow">
        {/* Left section*/}
        <div className="hidden lg:w-1/2 lg:flex justify-center items-center relative">
          <img src={backgroundSignUp} alt="Background" className="w-full h-full object-cover" />
          
        {/**the circle */}
          <div className="absolute">
            <div className="w-[250px] h-[250px] bg-white rounded-full opacity-80 flex items-center justify-center">
              <img src={Logo} alt="Logo" className="h-28" />
            </div>
          </div>
        </div>

        {/* right section*/}
        <div className="w-full lg:w-1/2 bg-[#f6fff6] flex flex-col justify-center items-center p-8">
          <h1 className="text-4xl font-bold text-center mb-6">SIGN UP</h1>
          <form onSubmit={handleSubmit} className="w-3/4 flex flex-col items-center justify-center">
            {/* profule photo*/}
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                <div className="w-[80px] h-[80px] bg-gray-300 rounded-full flex items-center justify-center">
                  <img
                    src="https://via.placeholder.com/80" 
                    alt="Profile"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* email input*/}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2">EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EXAMPLE@GMAIL.COM"
                className="w-full h-6 pl-12 py-3 text-[10px] 
                 bg-gray-200 border border-neutral-500 shadow-xl rounded-md "
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={IconEmail} alt="Email Icon" className="h-4 w-5" />
              </span>
            </div>
{/**phone number  */}
<div className="relative mb-6">
              <label className="text-[10px] block mb-2">PHONE NUMBER</label>
              <input
                type="text"
                placeholder="****************"
                className="w-full h-6 pl-12 py-3 text-[10px] 
                 bg-gray-200 border border-neutral-500 shadow-xl rounded-md"
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={phone} alt="Phone Icon" className="h-4 w-5" />
              </span>
            </div>
{/**User name input  */}
<div className="relative mb-6">
              <label className="text-[10px] block mb-2">USER NAME </label>
              <input
                type="text"
                placeholder="@USER NAME"
                className="w-full h-6 pl-12 py-3 text-[10px] 
                 bg-gray-200 border border-neutral-500 shadow-xl rounded-md "
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={username} alt="username Icon" className="h-4 w-5" />
              </span>
            </div>
            {/**password */}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
                className="w-full h-6 pl-12 py-3 text-[10px] 
                 bg-gray-200 border border-neutral-500 shadow-xl rounded-md "
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={IconPassword} alt="password Icon" className="h-4 w-5" />
              </span>
            </div>
            {/**Re password  */}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2">RE-ENTER PASSWORD</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="**********"
                className="w-full h-6 pl-12 py-3 text-[10px] 
                 bg-gray-200 border border-neutral-500 shadow-xl rounded-md "
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={IconPassword} alt="password Icon" className="h-4 w-5" />
              </span>
            </div>
              {/**Country & City */} 
<div className="flex space-x-4 mb-6">
  {/* list Country */}
  <div className="relative w-1/2">
    <label className="text-[10px] block mb-2 mt-3">COUNTRY</label>
    <select
      className="w-full h-6 pl-2 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md"
      required
    >
      <option value="" disabled selected>Select Country</option>
      <option value="Syria">Syria</option>
      <option value="Egypt">Egypt</option>
      <option value="Jordan">Jordan</option>
      <option value="Saudi Arabia">Saudi Arabia</option>
      <option value="Lebanon">Lebanon</option>
    </select>
  </div>

  {/*list City */}
  <div className="relative w-1/2">
    <label className="text-[10px] block mb-2 mt-3">CITY</label>
    <select
      className="w-full h-6 pl-2 py-3 text-[10px] bg-gray-200 border border-neutral-500 shadow-xl rounded-md"
      required
    >
      <option value="" disabled selected>Select City</option>
      <option value="Damascus">Damascus</option>
      <option value="Cairo">Cairo</option>
      <option value="Amman">Amman</option>
      <option value="Riyadh">Riyadh</option>
      <option value="Beirut">Beirut</option>
    </select>
  </div>
</div>
  {/*error input */}
  {Invailed && (
              <div className="flex items-center justify-center 
               border border-red-400 text-red-700 mx-28 py-2 mt-2 rounded-md mb-4">
             <span><img src={IconError} className="h-5 w-5 mr-2"></img></span> 
                <span className="text-sm">{Invailed}</span>
              </div>
            )}

            <div className="flex flex-col items-center mb-6">
              <div className="text-center">
                <h4 className="text-[11px] inline"> HAVE AN ACCOUNT?</h4>
                <Link to={'/'} className="text-[11px] text-blue-500 hover:underline ml-2"> LOGIN </Link>
              </div>
              </div>
          <Button text={"CREATE ACCOUNT"} link0={'/verification'}/>
          </form>
      </div>
    </div>
      {/**error somethings */}
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
            <h2 className="text-lg font-semibold text-black mb-4">ERROR</h2>
            <p className="text-gray-600 mb-2 text-xs">
              PLEASE WAIT A FEW MINUTES <br /> BEFORE YOU TRY AGAIN
            </p>
            <hr className="w-4/5 border-b-2  border-gray-400 mx-auto my-4" />

            <button
              onClick={() => setShowModalError(false)}
              className="text-red-500 font-semibold hover:underline text-xs"
            >
              DISMISS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;