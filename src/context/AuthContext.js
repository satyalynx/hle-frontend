import React, { createContext, useState, useContext, useEffect } from 'react';
import * as authAPI from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authAPI.getToken();
    const storedUser = authAPI.getCurrentUser();
    
    if (token && storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (identifier, password) => {
    // 🟢 FIXED: Yahan token save nahi karna hai! Sirf backend ko OTP bhejne bolna hai.
    const data = await authAPI.login(identifier, password);
    return data; 
  };

  // 🟢 NEW: Asli Token yahan save hoga jab OTP verify ho jayega!
  const verifyOtp = async (email, otp) => {
    const data = await authAPI.verifyOtp(email, otp);
    
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await authAPI.register(userData);
    return data;
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
  };

  return (
    // 🟢 Don't forget to export verifyOtp here
    <AuthContext.Provider value={{ user, login, verifyOtp, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};