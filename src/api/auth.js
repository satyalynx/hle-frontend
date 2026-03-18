import axiosInstance from './axios';

export const login = async (identifier, password) => {
  console.log('Sending login data:', { identifier });
  const response = await axiosInstance.post('/auth/login/', {
    identifier,
    password,
  });
  console.log('Login response:', response.data);
  return response.data;
};

export const register = async (userData) => {
  console.log('Sending registration data:', userData);
  const response = await axiosInstance.post('/auth/register/', userData);
  console.log('Registration response:', response.data);
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
