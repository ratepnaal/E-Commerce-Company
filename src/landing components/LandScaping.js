import React from 'react';
import ShrubsImage from '../images/frames/FrameShrubs.png';
import Pavements from '../images/frames/framePavements.png';
import ViewAllIcon from '../images/icons/veiwAll.svg';

const LandScaping = () => {
  const sections = [
    { title: 'SHRUBS', image: ShrubsImage },
    { title: 'PAVEMENTS', image: Pavements },
  ];

  return (
    <div className="pt-5 bg-green-50 min-h-screen" id='land'>
      {/* Main Tittle*/}
      <h1 className="text-3xl font-bold mb-5 text-center text-gray-800 bg-green-300 py-5 w-full">LANDSCAPING DEPARTMENT</h1>

      {/* section frame*/}
      {sections.map((section, index) => (
        <div key={index} className="mb-10">
     {/**tittle section */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold pl-5 text-gray-700">{section.title}</h2>
            <button className="flex items-center bg-green-700 text-white py-1 px-3 rounded-lg mb-4 hover:bg-green-800 transition">
              VIEW ALL
              <img src={ViewAllIcon} alt="View All Icon" className="w-4 h-4 ml-2" />
            </button>
          </div>

          {/* photo freme*/}
          <div className="mt-4 ml-5">
            <img src={section.image} alt={`${section.title} Frame`} className="w-full rounded-lg shadow-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandScaping;
