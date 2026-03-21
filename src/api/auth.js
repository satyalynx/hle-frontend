import axiosInstance from './axios';

export const login = async (identifier, password) => {
  const response = await axiosInstance.post('/auth/login/', {
    identifier,
    password,
  });
  return response.data; // Ye sirf OTP bhejne ka message return karega
};

// 🟢 NEW: OTP Verify karne ke liye function
export const verifyOtp = async (email, otp) => {
  const response = await axiosInstance.post('/auth/verify-otp/', {
    email,
    otp,
  });
  return response.data; // Ye tera asli Token aur User return karega
};

export const register = async (userData) => {
  const response = await axiosInstance.post('/auth/register/', userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const getToken = () => {
  return localStorage.getItem('token');
};