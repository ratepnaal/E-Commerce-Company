import React from 'react';
import { useTranslation } from 'react-i18next';
import IntroPhoto from '../images/IntroPhoto.png';  
import ShadowIntro from '../images/ShadowIntroPhoto.png'; 
import SearchIcon from '../images/icons/Searsh.svg'
import DarkModeToggle from '../components/DarkModeToggle';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Intro = ({ darkMode , setDarkMode }) => {
  const {t} = useTranslation();
  return (
    <div>
      <LazyLoadComponent>
         <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${IntroPhoto})` }}>
      {/* Shadow of background*/}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-75"
        style={{ backgroundImage: `url(${ShadowIntro})` }}
      ></div>
       
  <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white space-y-6">
        <p className={`text-2xl md:text-3xl font-semibold uppercase ${darkMode?`text-white`:``}`}>
      {t('transform_your_vision')}
        </p>
       
        {/* Search*/}
        <div className="mt-4 relative">
          <input 
            type="text" 
            placeholder={`${t('search')}`}
            className={`p-3 w-full md:w-72 h-8 rounded-xl text-black
             bg-gray-300 border border-black pl-10 placeholder-black ${darkMode?`bg-gray-800`:``}`}/>
            <span className='absolute flex items-center top-2 left-52 '>
                < LazyLoadImage src={SearchIcon} alt='Icon Search ' className='h-4 w-4 ' />
            </span>
        </div>
      </div>
    </div>
    </LazyLoadComponent>
    </div>

 
  );
}

export default Intro;
