import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import lightShade from '../images/floorImage/floor1.png';
import DarkShade from '../images/floorImage/floor2.png';
import ShadeType1 from '../images/floorImage/floor3.png';
import ShadeType2 from '../images/floorImage/floor4.png';
import ShadeType3 from '../images/floorImage/floor5.png';
import ShadeType4 from '../images/floorImage/floor6.png';
import ShadeType5 from '../images/floorImage/floor7.png';
import Header from './Header';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ThemeContext } from '../contexts/ThemeContext';

const Floors = () => {
  const { t } = useTranslation();
  const { darkMode } = useContext(ThemeContext);
  const floorImages = [
    { src: lightShade, label: 'LIGHT SHADE BUTTERSCOTCH OAK' },
    { src: DarkShade, label: 'DARK SHADE BUTTERSCOTCH OAK' },
    { src: ShadeType1, label: '#SHADE #TYPE' },
    { src: ShadeType2, label: '#SHADE #TYPE' },
    { src: ShadeType3, label: '#SHADE #TYPE' },
    { src: ShadeType4, label: '#SHADE #TYPE' },
    { src: ShadeType5, label: '#SHADE #TYPE' },
  ];
  return (
    <div>
      <Header />
      <div className={`${darkMode ? 'bg-gray-900 min-h-screen' : 'bg-blue-50 min-h-screen'}`}>
        {/* Main tittle */}
        <h1 className={`text-3xl font-semibold pl-5 py-5 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-blue-200 text-gray-900'}`}>{t('images')}</h1>

        {/* Images*/}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 mt-8">
          {floorImages.map((floor, index) => (
            <div key={index} className={`flex flex-col items-center ${darkMode ? '' : ''}`}>
              <LazyLoadImage src={floor.src} alt={floor.label} className="w-4/5 rounded-sm shadow-lg" />
              <p className={`text-center mt-4 text-sm font-medium ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>{floor.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Floors;
