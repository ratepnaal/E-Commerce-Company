import React, { createContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; 

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation(); // للوصول لـ instance تبع i18next
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // دالة تغيير اللغة
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // تغيير اللغة الفعلية باستخدام i18next
    setCurrentLanguage(lang);  // تحديث الحالة باللغة الجديدة

  };
   useEffect(() => {
    document.body.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
  }, [currentLanguage]);
    return (
    // 3. توفير القيمة (currentLanguage و changeLanguage) للـ children
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
