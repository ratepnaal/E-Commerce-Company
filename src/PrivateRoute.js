import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken'); // التحقق من التوكن
  return accessToken ? children : <Navigate to="/" />; // إعادة التوجيه إذا لم يكن هناك توكن
};

export default PrivateRoute;
