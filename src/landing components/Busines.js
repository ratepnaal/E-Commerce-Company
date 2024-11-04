import React from 'react';
import { useTranslation } from 'react-i18next';
import interior1 from '../images/interior/interior1.png';
import interior2 from '../images/interior/interior2.png';
import interior3 from '../images/interior/interior3.png';
import interior4 from '../images/interior/interior4.png';
import interior5 from '../images/interior/interior5.png';
import interior6 from '../images/interior/interior6.png';
import exterior1 from '../images/exterior/exterior1.png';
import exterior2 from '../images/exterior/exterior2.png';
import exterior3 from '../images/exterior/exterior3.png';
import exterior4 from '../images/exterior/exterior4.png';
import exterior5 from '../images/exterior/exterior5.png';
import exterior6 from '../images/exterior/exterior6.png';
import locationIcon from '../images/icons/locationIcon.svg';
import whatsappIcon from '../images/icons/whatsappIcon.svg';
import EmailIcon from '../images/icons/ic_outline-email.svg';
import viewAllIcon from '../images/icons/veiwAll.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Business = ({darkMode , setDarkMode}) => {
  const {t} = useTranslation();
  return (
    <div className={`bg-blue-300 p-8 ${darkMode?`bg-gray-800 text-white`:``}`}>
      {/* Tittle section */}
      <h1 className={`text-4xl font-semibold text-center mb-8 ${darkMode?`text-white`:``}`} >
     {t('Business-exhibition')}
      </h1>

      {/*section images*/}
      <div className="flex justify-between" id='projects'>
        {/* interior images*/}
       <div className={`w-1/2 border border-blue-300 p-4 mr-5 rounded-md ${darkMode?`bg-gray-500`:`bg-white`}` } >
          <div className={`flex justify-between items-center mb-4 `} >
          <h2 className={`text-sm md:text-xl font-bold  ${darkMode?`text-white`:``}`}>{t('interior')}</h2>
            <button className="flex items-center px:1 py-1 md:px-3 text-xs md:text-sm  bg-teal-900 text-white rounded-lg mb-4 hover:bg-teal-950 transition">
              {t('view_all')}
              <img src={viewAllIcon} alt="View All Icon" className="w-4 h-4 ml-2" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            < LazyLoadImage src={interior1} alt="Interior 1" className="w-full h-auto rounded-md" />
            < LazyLoadImage src={interior2} alt="Interior 2" className="w-full h-auto rounded-md" />
            < LazyLoadImage src={interior3} alt="Interior 3" className="w-full h-auto rounded-md" />
            < LazyLoadImage src={interior4} alt="Interior 4" className="w-full h-auto rounded-md" />
            < LazyLoadImage src={interior5} alt="Interior 5" className="w-full h-auto rounded-md" />
            < LazyLoadImage src={interior6} alt="Interior 6" className="w-full h-auto rounded-md" />
          </div>
        </div>

        {/*exterior images*/}
        <div className={`w-1/2 border border-blue-300 p-4 rounded-md   ${darkMode?`bg-gray-500`:`bg-white`}` } >
          <div className="flex justify-between items-center mb-4">
          <h2 className={`text-sm md:text-xl font-bold  ${darkMode?`text-white`:``}`}>{t('exterior')}</h2>
            <button className="flex items-center px:1 py-1 md:px-3 text-xs md:text-sm  bg-teal-900 text-white rounded-lg mb-4 hover:bg-teal-950 transition">
             {t('view_all')}
              <img src={viewAllIcon} alt="View All Icon" className="w-4 h-4 ml-2" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            < LazyLoadImage src={exterior1} alt="Exterior 1" className="w-full h-auto rounded-md" />
            < LazyLoadImage src={exterior2} alt="Exterior 2" className="w-full h-auto rounded-md" />
            < LazyLoadImage src={exterior3} alt="Exterior 3" className="w-full h-auto rounded-md" />
            < LazyLoadImage src={exterior4} alt="Exterior 4" className="w-full h-auto rounded-md" />
            < LazyLoadImage src={exterior5} alt="Exterior 5" className="w-full h-auto rounded-md" />
            < LazyLoadImage src={exterior6} alt="Exterior 6" className="w-full h-auto rounded-md" />
          </div>
        </div>
      </div>

      {/* contact us*/}
      <div className= {`md:flex justify-between items-center mt-8 bg-blue-300 p-4 rounded-md ${darkMode?`bg-gray-800`:``}`} id='contact'>
        <div className='flex items-center'>
            <span className='text-2xl'>{t('contact_us')}</span>
        </div>
        <div className="flex items-center">
          <img src={locationIcon} alt="Location Icon" className="mr-2 h-4 w-4" />
          <span className='text-xs md:text-sm font-medium'>{t('address')}</span>
        </div>
        <div className="flex items-center">
          <img src={whatsappIcon} alt="WhatsApp Icon" className="mr-2 h-4 w-4"  />
          <span className='text-xs md:text-sm font-medium'>{t('phone_contact')}</span>
        </div>
        <div className="flex items-center">
          <img src={EmailIcon} alt="Email Icon" className="mr-2 h-4 w-4" />
          <span className='text-xs md:text-sm font-medium'>{t('email_contact')}</span>
        </div>
      </div>
    </div>
  );
};

export default Business;
