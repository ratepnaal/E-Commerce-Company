import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../contexts/ThemeContext';
import CategoryProducts from '../components/CategoryProducts'; // <-- استيراد المكون الجديد

const LandScaping = () => {
  const { t } = useTranslation();
  const { darkMode } = useContext(ThemeContext);

  // قائمة الفئات التي نريد عرضها في هذه الصفحة
  const landscapingCategories = [
    { id: 6, title: t('shrubs') },
    { id: 7, title: t('pavements') },
  ];

  return (
    <div className={`space-y-8 ${darkMode ? 'bg-gray-900' : 'bg-white'} py-8`}>
      {/* The Tittle */}
      <h2 className={`text-3xl font-medium text-center py-5 ${darkMode ? 'bg-gray-800 text-white' : 'bg-green-300 text-gray-700'}`}>
        {t('landscaping_department')}
      </h2>

      <div className="container mx-auto px-4">
        {landscapingCategories.map((category) => (
          <CategoryProducts 
            key={category.id} 
            title={category.title} 
            categoryId={category.id} 
          />
        ))}
      </div>
    </div>
  );
};

export default LandScaping;

