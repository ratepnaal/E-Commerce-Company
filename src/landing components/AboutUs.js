import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; 
import FakeVedio from '../images/FakeVedio.png'; 
import ShadowFakeVedio from '../images/ShadowVedio.png'; 
import ExitVedioIcon from '../images/icons/ExitVedioIcon.svg'; 
import PlayVedio from '../images/icons/playVedio.svg'; 

const AboutUs = ({ darkMode, setDarkMode }) => {
  const { t } = useTranslation(); 
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleVideoClick = () => {
    setIsVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <div className={`relative bg-gray-100 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <h2 className={`text-3xl font-medium text-center py-5 bg-blue-200  h-full w-full ${darkMode?`bg-gray-800`:``}`} >
        {t('about_us')}
      </h2>
      <div className="flex h-full w-full">
        <div className='w-full md:w-1/2 h-full flex-row px-5 py-5'>
          <p className='font-bold text-sm uppercase'>{t('welcome')}</p>
          <p className='text-xs uppercase font-medium'>{t('welcome_text')}</p>

          <p className='font-bold text-sm uppercase'>{t('mission')}</p>
          <p className='text-xs uppercase font-medium'>{t('mission_text')}</p>

          <p className='font-bold text-sm uppercase'>{t('team')}</p>
          <p className='text-xs uppercase font-medium'>{t('team_text')}</p>
        </div>
        <div className='w-full md:w-1/2 h-full flex-row px-5 py-4'>
          <p className='font-bold text-sm uppercase'>{t('offer')}</p>
          <p className='text-xs uppercase font-medium'>{t('offer_text')}</p>

          <p className='font-bold text-sm uppercase'>{t('why_choose_us')}</p>
          <p className='text-xs uppercase font-medium'>{t('why_choose_us_text')}</p>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="relative cursor-pointer" onClick={handleVideoClick}>
          <img src={FakeVedio} alt="Fake Video" className="w-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={PlayVedio} alt="Play Icon" className="h-16 w-16 cursor-pointer" />
          </div>
          <img src={ShadowFakeVedio} alt="Video Shadow" className="absolute top-0 left-0 w-full h-full pointer-events-none" />
        </div>

        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-90">
            <img src={FakeVedio} alt="Full Screen Video" className="w-full h-full object-cover" />
            <button className="absolute top-8" onClick={handleCloseVideo}>
              <img src={ExitVedioIcon} alt="Exit Video" className="h-10 w-10" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUs;





