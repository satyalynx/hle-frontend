import axios from 'axios';

// 🔴 Ensure this is your Render URL
const baseURL = 'https://hle-backend.onrender.com'; 

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Guard 1: Har API call mein Token chipkana
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Guard 2: 401 aane par kya karna hai
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    
    // 🔥 BULLETPROOF DEEWAR 🔥
    // Agar API ka naam 'emergency' hai aur wo fail ho jaye, toh CHUP-CHAAP ignore karo! LOGOUT MAT KARO.
    if (originalRequest.url && originalRequest.url.includes('/emergency')) {
        return Promise.reject(error);
    }

    // Baaki kisi asli API (jaise profile/complaints) pe 401 aaye, tabhi logout karo
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