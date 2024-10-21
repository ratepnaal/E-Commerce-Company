import React, { useState } from 'react';
import MailCoin from '../images/MailCoin.svg';
import BigCircle from '../images/BigCircle.svg';
import SmallCircle from '../images/SmallCircle.svg';
import { Link } from 'react-router-dom';

const Verification = () => {
    const [Signed , setSigned] = useState(false);
    const handleSigned = ()=>{
        setSigned(true)
    }
  return (
    <div  className="flex flex-col items-center justify-center min-h-screen bg-[#F0F8FF]">
      <div className="relative w-full h-[200px] flex justify-center items-center">
        {/* Background circles */}
        <img src={BigCircle} alt="BigCircle" className="absolute top-[-50px]  left-[670px] w-40 h-40 " />
        <img src={SmallCircle} alt="SmallCircle" className="absolute bottom-9 left-[550px] w-24 h-24" />
        {/* Mail Icon */}
        <img src={MailCoin} alt="MailCoin" className="z-10 w-32 h-32" />
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-3">PLEASE VERIFY ACCOUNT</h2>
      <p className="text-sm text-center mt-2 px-4 font-medium">
        ENTER THE 6 DIGIT CODE (CONTAINS LETTERS AND NUMBERS) THAT WE SENT
        TO YOUR EMAIL ADDRESS TO VERIFY YOUR NEW ACCOUNT
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

      <p className="text-sm font-semibold mt-4">VALID FOR 3 MINUTES</p>

      {/* Resend Code */}
      <p className="text-xs font-medium text-blue-500 cursor-pointer mt-2">RESEND CODE</p>

      {/* Verify Button */}
      <button onClick={handleSigned} className="mt-6 w-60 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600">
        VERIFY AND CONTINUE
      </button>
      {Signed && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white p-4 rounded-2xl shadow-lg text-center fade-in"
            style={{
              width: "300px",
              animation: "fadeIn 0.5s",
              borderRadius: "20px",
            }}
          >
            <h2 className="text-lg font-semibold text-black mb-4">SIGNED UP</h2>
            <p className="text-gray-600 mb-2 text-xs">
            YOUR ACCOUNT IS SUCCESSFULLY VERIFIED
            </p>
            <hr className="w-4/5 border-b-2  border-gray-400 mx-auto my-4" />

            <button
              onClick={() => setSigned(false)}
              className="text-green-500 font-semibold hover:underline text-xs"
            >

              <Link to="/profile">CONTINUE</Link>

            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verification;

