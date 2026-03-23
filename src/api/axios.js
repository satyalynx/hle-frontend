import axios from 'axios';

const baseURL = 'https://hle-backend.onrender.com'; 

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Guard 1: Add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // 🔥 FIX: Don't set Content-Type for FormData - browser does it automatically
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Guard 2: Handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    
    // Ignore emergency endpoint failures
    if (originalRequest.url && originalRequest.url.includes('/emergency')) {
        return Promise.reject(error);
    }
    
    // Logout on 401 for other endpoints
    if (error.response && error.response.status === 401) {
      console.error("Token expired or invalid. Logging out...");
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; 
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;