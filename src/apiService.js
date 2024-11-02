import axios from 'axios';

const API_URL = 'https://backendsec3.trainees-mad-s.com/api';

export const signUp  = async (formData) => {
  try {
    const response = await axios.post('https://backendsec3.trainees-mad-s.com/api/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.error("Sign Up Error:", error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const token = response.data.access_token;

    // تخزين التوكن في localStorage
    if (token) {
      localStorage.setItem('authToken', token);
      console.log("Token :" , token)
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
export const changePassword = async(forget)=>{
  try{
  const response = await axios.post(`${API_URL}/forgot-password`, forget);
  return response;
  }
  catch(error){
    console.error("send code error", error);
    throw error;
  }
}

export const verifyToken = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/verify`, { token });
      // تخزين التوكن وبيانات المستخدم بعد التسجيل الناجح
      const token = response.data.token;
      localStorage.setItem('authToken', token); // تخزين التوكن
    return response.data;
  } catch (error) {
    console.error("Token verification error:", error);
    throw error;
  }
};