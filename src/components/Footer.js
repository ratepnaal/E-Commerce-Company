import React from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../images/logo.svg';
import FacebookIcon from '../images/icons/facebook.svg';
import InstgramIcon from '../images/icons/instgram.svg';

const Footer = () => {
  const {t} = useTranslation();
  return (
    <footer className="bg-teal-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0 px-4 md:px-0">
        {/*Logo & Social Media */}
        <div className="flex flex-col items-start space-y-4 md:w-1/4">
          <img src={Logo} alt="Company Logo" className="w-16" />
          <p className="text-xs">{t('the_construction_and_landscaping_company')}</p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={FacebookIcon} alt="Facebook" className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={InstgramIcon} alt="Instagram" className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Hour Of Work*/}
        <div className="flex flex-col items-start md:w-1/4">
          <h3 className="font-bold text-sm mb-2">{t('business_hours')}</h3>
          <p className="text-xs">{t('monday_friday')}</p>
          <p className="text-xs">{t('saturday')}</p>
          <p className="text-xs">{t('sunday')}</p>
        </div>

        {/*Quick Links */}
        <div className="flex flex-col items-start md:w-1/4">
          <h3 className="font-bold text-sm mb-2">{t('quick_links')}</h3>
          <ul className="text-xs space-y-1">
            <li><a href="#" className="hover:underline">{t('home')}</a></li>
            <li><a href="#about" className="hover:underline">{t('about_us_section')}</a></li>
            <li><a href="#services" className="hover:underline">{t('services')}</a></li>
            <li><a href="#projects" className="hover:underline">{t('projects')}</a></li>
            <li><a href="#contact" className="hover:underline">{t('contact')}</a></li>
          </ul>
        </div>

        {/*Cartificatie*/}
        <div className="flex flex-col items-start md:w-1/4">
          <h3 className="font-bold text-sm mb-2">{t('awards_and_certifications')}</h3>
          <p className="text-xs mb-1">{t('proud_member')}</p>
          <p className="text-xs">{t('certified_green_builder')}</p>
        </div>
      </div>

      {/*Right reseved*/}
      <div className="text-center text-xs mt-8">
       {t('footer_note')}
      </div>
    </footer>
  );
};

export default Footer;

