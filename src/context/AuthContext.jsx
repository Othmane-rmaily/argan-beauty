// No changes needed to AuthContext.jsx
// The existing implementation works well with session-based authentication
import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../services/auth';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      // First check if we're on the login page to prevent refresh loops
      const isLoginPage = window.location.pathname === '/login';
      
      try {
        // Only try to authenticate if we're not already on the login page
        // or if we have a stored user (potential valid session)
        if (!isLoginPage || localStorage.getItem('user')) {
          const response = await api.get('/user');
          setUser(response.data);
        } else {
          // We're on login page and no stored user, skip authentication check
          setUser(null);
        }
      } catch (err) {
        // User is not authenticated
        setUser(null);
        localStorage.removeItem('user'); // Clear any invalid stored user data
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    setError(null);
    try {
      const data = await AuthService.login(credentials);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const register = async (userData) => {
    setError(null);
    try {
      const data = await AuthService.register(userData);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const userData = await AuthService.refreshUserData();
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Error refreshing user data:', error);
      return null;
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    refreshUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;