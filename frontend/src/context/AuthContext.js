import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userTeam, setUserTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const storedUser = authService.getUser();
      const storedTeam = localStorage.getItem('userTeam');
      const hasToken = authService.isAuthenticated();
      
      if (storedUser && hasToken) {
        try {
          await authService.verify();
          setUser(storedUser);
          setUserTeam(storedTeam || 'Sales');
          setIsAuthenticated(true);
        } catch (error) {
          // Token is invalid, clear storage
          authService.logout();
          localStorage.removeItem('userTeam');
          setUser(null);
          setUserTeam(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password, team = 'Sales') => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      setUserTeam(team);
      setIsAuthenticated(true);
      localStorage.setItem('userTeam', team);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setUserTeam(null);
      setIsAuthenticated(false);
      localStorage.removeItem('userTeam');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUserTeam = (team) => {
    setUserTeam(team);
    localStorage.setItem('userTeam', team);
  };

  const value = {
    user,
    userTeam,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUserTeam
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
