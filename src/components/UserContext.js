import React, { createContext, useState, useEffect } from 'react';

// إنشاء `UserContext`
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // عند تحميل التطبيق، جلب بيانات المستخدم من `localStorage` إن وجدت
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    // التحقق من أن القيمة ليست `undefined` أو `null` وتجنب الخطأ في `JSON.parse`
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        // إذا كانت البيانات غير صالحة، حذفها من `localStorage`
        localStorage.removeItem('userData');
      }
    }
  }, []);

  // دالة لتحديث بيانات المستخدم وحفظها في `localStorage`
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  // دالة تسجيل الخروج، تحذف بيانات المستخدم من `Context` و`localStorage`
  const logout = () => {
    setUser(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

