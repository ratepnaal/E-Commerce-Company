import api from './api';

const API_URL = 'https://backendsec3.trainees-mad-s.com/api';

export const signUp = async (formData) => {
  try {
    const response = await api.post(
      'https://backendsec3.trainees-mad-s.com/api/register', 
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log("successful signup " , response)
    return response
  } catch (error) {
    console.error("Sign Up Error:", error.response || error);
    throw error;
  }
};


export const login = async (credentials) => {
  try {
    const response = await api.post(`${API_URL}/login`, credentials);
    console.log( "Login Succefully" , response)
    return response
  } catch (error) {
    console.error("Login error:", error.response || error);
    throw error;
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await api.post(`${API_URL}/verify`, { token });
      // تخزين التوكن وبيانات المستخدم بعد التسجيل الناجح
    return response.data;
  } catch (error) {
    console.error("Token verification error:", error);
    throw error;
  }
};

export const requestPasswordReset = async (emailData) => {
  try {
    const response = await api.post(`${API_URL}/forgot-password`, emailData);
    console.log("Password reset code sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Request password reset error in apiService:", error.response || error);
    throw error;
  }
};

export const verifyPasswordResetCode = async (verificationData) => {
  try {
    // تأكد من أن الـ endpoint صحيح حسب تصميم الباك-إند عندك
    const response = await api.post('/user/password/verify-forgot-Password-code', verificationData);
    console.log("Verification successful:", response.data);
    return response;
  } catch (error) {
    console.error("Verify reset code error in apiService:", error.response || error);
    throw error;
  }
};

export const resetPassword = async (passwordData) => {
  try {
    // 1. قراءة التوكن المؤقت من localStorage
    const token = localStorage.getItem('resetToken');
    if (!token) {
      throw new Error("Reset token not found. Please start the process again.");
    }

    // 2. إرسال الطلب مع كلمة المرور الجديدة والتوكن في الـ Headers
    const response = await api.post(
      '/user/password/reset-password',
      passwordData,
      {
        headers: {
          // استخدام التوكن المؤقت للمصادقة على هذا الطلب
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Password has been reset successfully:", response.data);
    return response;
  } catch (error) {
    console.error("Reset password error in apiService:", error.response || error);
    throw error;
  }
};
