import axios from 'axios';

// إنشاء Axios instance
const api = axios.create({
  baseURL: 'https://backendsec3.trainees-mad-s.com/api',
});

// إعداد Interceptor للطلبات
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// إعداد Interceptor للاستجابة
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // تحقق من انتهاء صلاحية التوكن
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post(
            'https://backendsec3.trainees-mad-s.com/api/refresh-token',
            { token: refreshToken }
          );

          const newAccessToken = response.data.accessToken;

          // تحديث Access Token في localStorage
          localStorage.setItem('accessToken', newAccessToken);

          // إعادة إرسال الطلب الأصلي مع التوكن الجديد
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (err) {
          // في حال فشل تجديد التوكن، تسجيل الخروج
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
