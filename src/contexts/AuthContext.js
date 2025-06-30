import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as apiService from '../apiService'; // استيراد كل الدوال من apiService

// 1. إنشاء الـ Context
export const AuthContext = createContext();

// Hook مخصص لتسهيل استخدام الـ AuthContext في الكومبوننتات الأخرى
export const useAuth = () => {
    return useContext(AuthContext);
};

// 2. إنشاء الـ Provider Component
export const AuthProvider = ({ children }) => {
    // State لتخزين بيانات المستخدم والتوكن وحالة المصادقة
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('accessToken'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
    const [loading, setLoading] = useState(true); // حالة تحميل للتحقق الأولي من التوكن

    // useEffect للتحقق من التوكن المحفوظ عند أول تحميل للتطبيق
    useEffect(() => {
        const checkLoggedIn = () => {
            const storedToken = localStorage.getItem('accessToken');
            const storedUser = localStorage.getItem('user'); // افترض أننا نخزن بيانات المستخدم كـ JSON string

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);
            }
            setLoading(false); // إنهاء التحميل الأولي
        };

        checkLoggedIn();
    }, []);

    // دالة تسجيل الدخول
    const login = async (email, password) => {
        try {
            const response = await apiService.login({ email, password });
            
            // افترض أن الـ API يرجع التوكن وبيانات المستخدم
            const { accessToken, user: userData } = response.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify(userData)); // تخزين بيانات المستخدم

            setToken(accessToken);
            setUser(userData);
            setIsAuthenticated(true);

            return { success: true };
        } catch (error) {
            console.error("AuthContext Login Error:", error);
            // إرجاع الخطأ ليتم عرضه في كومبوننت تسجيل الدخول
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    // دالة تسجيل الخروج
    const logout = () => {
        // حذف البيانات من State ومن localStorage
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        // يمكن توجيه المستخدم لصفحة تسجيل الدخول هنا إذا أردت
        // navigate('/'); // ستحتاج لتمرير navigate إذا أردت استخدامها هنا
    };

    
// --- بداية الإضافة ---
// دالة تسجيل دخول وهمية للتجربة فقط
const mockLogin = () => {
    console.log("Executing mock login...");
    const mockUser = {
        full_name: 'Rateb N',
        email: 'test@example.com',
        address: 'Damascus, Syria',
        photo: null // يمكنك وضع رابط صورة افتراضية هنا
    };
    const mockToken = 'mock-test-token-12345';

    // تحديث الـ localStorage
    localStorage.setItem('accessToken', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));

    // تحديث الـ State تبع الـ Context
    setToken(mockToken);
    setUser(mockUser);
    setIsAuthenticated(true);
};
// --- نهاية الإضافة ---

    // تجميع القيم التي سيوفرها الـ Provider
    const value = {
        isAuthenticated,
        user,
        token,
        loading,
        login,
        logout,
        mockLogin
    };


    // عرض الـ children فقط بعد انتهاء التحقق الأولي من التوكن
    // هذا يمنع وميض الصفحة (flickering) بين حالة تسجيل الخروج والدخول
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};