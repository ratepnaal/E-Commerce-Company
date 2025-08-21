import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../contexts/ThemeContext';
import CategoryProducts from '../components/CategoryProducts'; // <-- استيراد المكون الجديد

const Interior = () => {
  const { t } = useTranslation();
  const { darkMode } = useContext(ThemeContext);

  // قائمة الفئات التي نريد عرضها في هذه الصفحة
  // الأرقام (categoryId) هي التي سنستخدمها لاحقاً لجلب البيانات من الـ API
  const interiorCategories = [
    { id: 1, title: t('floor') },
    { id: 2, title: t('walls') },
    { id: 3, title: t('sinks') },
    { id: 4, title: t('faucets') },
    { id: 5, title: t('kitchens') },
  ];

  return (
    <div className={`space-y-8 ${darkMode ? 'bg-gray-900' : 'bg-white'} py-8`}>
      {/* The Tittle */}
      <h2 className={`text-3xl font-medium text-center py-5 ${darkMode ? 'bg-gray-800 text-white' : 'bg-blue-200 text-gray-800'}`}>
        {t('interior_cladding')}
      </h2>

      <div className="container mx-auto px-4">
        {interiorCategories.map((category) => (
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

export default Interior;
