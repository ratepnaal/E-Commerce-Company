import React, { useEffect, useState } from "react";
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


const Login = ({darkMode , setDarkMode}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const Images = [Photo1, Photo2, Photo3, Photo4, Photo5, Photo6];
  const [showModalError, setShowModalError] = useState(false);
  const [Invailed, setInvailed] = useState("");

  // Images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % Images.length);
    }, 10000); //change after 10 minutes
    return () => clearInterval(interval);
  }, [Images.length]);

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
    <div className=" h-screen w-screen flex flex-col flex-grow ">
      {/* Header*/}
      <header className="w-full h-[50px] bg-[#1c5268] "></header>
      <div className="flex flex-grow">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
          <h1 className="text-6xl font-bold text-center mb-2">WELCOME</h1>
          <p className="text-3xl font-semibold text-center mb-8">
            REINVENT YOUR SPACE WITH US
          </p>
          <img src={Logo} alt="Logo" className="h-16 mb-8" />
          <form onSubmit={handleSubmit} className="w-3/4 flex flex-col items-center justify-center">  
            {/* Email*/}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2">EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EXAMPLE@GMAIL.COM"
                className= {`h-6 pl-12 py-3 text-[10px] 
                 bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${darkMode?`text-black`:``}`}
                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={IconeEmail} alt="Email Icon" className="h-4 w-5" />
              </span>
            </div>

            {/* Password*/}
            <div className="relative mb-6">
              <label className="text-[10px] block mb-2">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
                className= {`h-6 pl-12 py-3 text-[10px] 
                  bg-gray-200 border border-neutral-500 shadow-xl rounded-md ${darkMode?`text-black`:``}`}

                required
              />
              <span className="absolute top-7 left-3 flex items-center">
                <img src={IconPassword} alt="Password Icon" className="h-4 w-5" />
              </span>
            </div>
            {/* Error messsage */}
            {Invailed && (
              <div className="flex items-center justify-center 
               border border-red-400 text-red-700 mx-28 py-2 mt-2 rounded-md mb-4">
             <span><img src={IconError} className="h-5 w-5 mr-2"></img></span> 
                <span className="text-sm">{Invailed}</span>
              </div>
            )}
            {/*Link & Button */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="text-center">
                <h4 className="text-[11px] inline">DON'T HAVE AN ACCOUNT?</h4>
                <Link to={'/sign-up'} className="text-[11px] text-blue-500 hover:underline ml-2">SIGN UP </Link>
              </div>
              <div className="text-center mt-2">
                <h4 className="text-[11px] inline">FORGOT PASSWORD?</h4>
                <Link to={'/change-password'} className="text-[11px] text-blue-500 hover:underline ml-2"> CHANGE PASSWORD</Link>
              </div>
            </div>
            <button
              type="submit"
              className="w-28 h-8 border border-neutral-500 shadow-xl bg-green-500 flex items-center justify-center
               hover:bg-green-600 text-black font-semibold py-2 rounded-lg text-[11px]"
            >
              LOGIN
            </button>
          </form>
        </div>

        {/*Right Section */}
        <div className="hidden lg:block lg:w-1/2 h-full pl-20">   {/**Hide this section in small screen */}
          <div
            className="w-full h-full bg-cover bg-center transition-all duration-1000"
            style={{
              backgroundImage: `url(${Images[currentImage]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
      {/**ERROR window*/}
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
  )
}

export default Login;
