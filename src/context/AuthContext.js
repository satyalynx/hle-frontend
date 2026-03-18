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
    const data = await authAPI.login(identifier, password);
    
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
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
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
