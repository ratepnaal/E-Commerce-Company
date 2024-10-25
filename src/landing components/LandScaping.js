import React from 'react';
import { useTranslation } from 'react-i18next';
import ShrubsImage from '../images/frames/FrameShrubs.png';
import Pavements from '../images/frames/framePavements.png';
import ViewAllIcon from '../images/icons/veiwAll.svg';

const LandScaping = ({ darkMode, setDarkMode }) => {
  const { t } = useTranslation();
  const sections = [
    { title: `${t('shrubs')}`, image: ShrubsImage },
    { title: `${t('pavements')}`, image: Pavements },
  ];

  return (
    <div className={`pt-5 min-h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-green-50 text-black'}`} id="land">
      {/* Main Title */}
      <h2 className={`text-3xl font-medium text-center py-5 mb-5 ${darkMode ? 'bg-gray-800 text-white' : 'bg-green-300 text-gray-700'}`}>
        {t('landscaping_department')}
      </h2>

      {/* Sections */}
      {sections.map((section, index) => (
        <div key={index} className="mb-10">
          {/* Title Section */}
          <div className="flex items-center justify-between">
            <h2 className={`text-2xl font-semibold pl-5 ${darkMode ? 'text-white' : 'text-gray-700'}`}>{section.title}</h2>
            <button
              className={`flex items-center py-1 px-3 rounded-lg mb-4 transition ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-700 hover:bg-green-800'} text-white`}
            >
              {t('view_all')}
              <img src={ViewAllIcon} alt="View All Icon" className="w-4 h-4 ml-2" />
            </button>
          </div>

          {/* Photo Frame */}
          <div className="mt-4 ml-5">
            <img src={section.image} alt={`${section.title} Frame`} className="w-full rounded-lg shadow-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandScaping;

