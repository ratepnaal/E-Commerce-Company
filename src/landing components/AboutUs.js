import React, { useState } from 'react';
import FakeVedio from '../images/FakeVedio.png'; 
import ShadowFakeVedio from '../images/ShadowVedio.png'; 
import ExitVedioIcon from '../images/icons/ExitVedioIcon.svg'; 
import PlayVedio from '../images/icons/playVedio.svg'; 

const AboutUs = ({darkMode , setDarkMode}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // function open photo
  const handleVideoClick = () => {
    setIsVideoOpen(true);
  };

  // function close photo
  const handleCloseVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <div className={`relative bg-gray-100 ${darkMode?`bg-gray-800`:`bg-gray-100`}`}>
      <h2 className="text-3xl font-medium text-center py-5 bg-blue-200  h-full w-full ">ABOUT US AND OUR SERVICES</h2>
      {/**Talk About Us */}
      <div className={`flex h-full w-full`}>
      <div className='w-full md:w-1/2 h-full flex-row px-5 py-5 '>
      <p className=' font-bold text-sm uppercase '>WELCOME</p>
      <p className=' text-xs uppercase font-medium'>to Z and N Construction and Landscaping, where quality meets creativity.<br/> 
        Founded with a passion for transforming outdoor spaces and building lasting structures,<br/>
         we are dedicated to providing
         exceptional services that enhance both the beauty and<br/> functionality of your property.</p>
         <p className=' font-bold text-sm uppercase '>Our Mission</p>
         <p className=' text-xs uppercase font-medium'>At Z and N, our mission is to deliver high-quality construction and<br/>
             landscaping solutions tailored to meet the unique needs of our clients.<br/>
              We believe in creating spaces that reflect your vision while ensuring<br/>
               durability and sustainability.</p>
               <p className='font-bold text-sm uppercase'>Our Team</p>
               <p className='text-xs uppercase font-medium'>Our experienced team of professionals brings a wealth of knowledge<br/>
                 and expertise to every project. From skilled landscapers to expert<br/>
                  builders, we work collaboratively to ensure that each job is completed<br/>
                   to the highest standards. We pride ourselves on our attention to detail,<br/>
                    commitment to excellence, and passion for our craft.</p>
      </div>
      <div className='w-full md:w-1/2 h-full flex-row px-5 py-4'> 
      <p className='font-bold text-sm uppercase '> What We Offer </p>
      <p className=' text-xs uppercase font-medium'>Construction Services: From residential projects to commercial<br/>
         builds, we handle everything from design to execution, ensuring a<br/>
          seamless construction process.<br/>
          Landscaping Services: Our landscaping team specializes in creating<br/>
           beautiful gardens, patios, and outdoor living spaces that enhance<br/>
            your property’s appeal.</p>
            <p className='font-bold text-sm uppercase '>why choose us?</p>
            <p className=' text-xs uppercase font-medium'>Quality Craftsmanship: We use only the best materials and<br/>
                 techniques to ensure lasting results.<br/>
                 Customer-Centric Approach: Your satisfaction is our priority. We<br/>
                  listen to your needs and work closely with you throughout the<br/>
                   project.<br/>
                   Sustainable Practices: We are committed to environmentally friendly<br/>
                    practices that benefit both our clients and the planet.<br/>
                    Join us in creating beautiful, functional spaces that you can cherish<br/>
                     for years to come. At Z and N Construction and Landscaping, we turn<br/>
                      your dreams into reality.
                 </p>

      </div>
      </div>
    
      <div className="relative mt-8">
        {/* Vedio Image*/}
        <div className="relative cursor-pointer" onClick={handleVideoClick}>
          <img 
            src={FakeVedio} 
            alt="Fake Video" 
            className="w-full" 
          />
          {/* Play Icon*/}
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={PlayVedio} 
              alt="Play Icon" 
              className="h-16 w-16 cursor-pointer"
            />
          </div>
          {/* Shadow photo*/}
          <img 
            src={ShadowFakeVedio} 
            alt="Video Shadow" 
            className="absolute top-0 left-0 w-full h-full pointer-events-none" 
          />
        </div>
{/**photo in full screen  */}
        {isVideoOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-90">
            <img 
              src={FakeVedio} 
              alt="Full Screen Video" 
              className="w-full h-full object-cover"
            />
            {/* Exit Button*/}
            <button 
              className="absolute top-8 "
              onClick={handleCloseVideo}
            >
              <img 
                src={ExitVedioIcon} 
                alt="Exit Video" 
                className="h-10 w-10 "
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AboutUs;




