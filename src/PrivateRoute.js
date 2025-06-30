import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; // 1. استيراد الـ Hook تبعنا

const PrivateRoute = ({ children }) => {
  // 2. الحصول على حالة المصادقة وحالة التحميل من الـ Context
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // 3. إذا كان الـ Context لسا عم يتأكد من التوكن، اعرض رسالة تحميل
  // هذا يمنع إعادة التوجيه الخاطئة قبل التأكد من حالة المستخدم
  if (loading) {
    return <div>Loading...</div>; // أو أي spinner/loader بتفضله
  }

  // 4. إذا انتهى التحميل والمستخدم غير مسجل دخوله، وجهه لصفحة تسجيل الدخول
  if (!isAuthenticated) {
    // نحفظ الصفحة اللي كان رايح عليها (location) مشان نرجعه عليها بعد تسجيل الدخول
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 5. إذا كان المستخدم مسجل دخوله، اعرض الصفحة المطلوبة (children)
  return children;
};

export default PrivateRoute;