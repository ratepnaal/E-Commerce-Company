import React from 'react';
import FloorsFrame from '../images/frames/FrameFloors.png';
import WallsFrame from '../images/frames/Frame Walls.png';
import SinksFrame from '../images/frames/FrameSinks.png';
import FaucetsFrame from '../images/frames/FrameFaucets.png';
import KitchensFrame from '../images/frames/FrameKitchens.png';
import ViewAll from '../images/icons/veiwAll.svg';  
import { Link } from 'react-router-dom';

const Interior = ({darkMode , setDarkMode}) => {
  const sections = [
    { title: 'FLOORS', image: FloorsFrame } ,
    { title: 'WALLS', image: WallsFrame },
    { title: 'SINKS', image: SinksFrame },
    { title: 'FAUCETS', image: FaucetsFrame },
    { title: 'KITCHENS', image: KitchensFrame },
  ];

  return (
    <div className="space-y-8">
      {/* The Tittle */}
      <h2 className={`text-3xl font-medium text-center py-5 bg-blue-200 ${darkMode?`bg-gray-800`:``}`}>INTERIOR CLADDING</h2>

      {sections.map((section, index) => (
        <div key={index} className={`p-4 bg-gray-100 rounded-lg shadow-md ${darkMode?`bg-gray-800`:``}`}>
        {/**Tittle & Button */}
   <div className="flex items-center justify-between" id='services'>
            <h2 className={`text-2xl font-semibold text-gray-700 ${darkMode?`text-white`:``}`}>{section.title}</h2>
            <button className="flex items-center bg-teal-900 text-white py-1 px-3 rounded-lg mb-4 hover:bg-teal-950 transition">
              <Link to="/floors"> VIEW ALL</Link>
              <img src={ViewAll} alt="View All Icon" className="w-4 h-4 ml-2" />
            </button>
          </div>

          {/* Image section*/}
          <div className="flex justify-center">
            <img src={section.image} alt={`${section.title} Frame`} className="w-full rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Interior;

