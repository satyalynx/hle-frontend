import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://hle-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('📤 Request:', config.method.toUpperCase(), config.url);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
   }
    return Promise.reject(error);
  }
);

export default axiosInstance;
