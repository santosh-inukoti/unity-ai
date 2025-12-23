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
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const storedUser = authService.getUser();
      const storedTeam = localStorage.getItem('userTeam');
      const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
      const hasToken = authService.isAuthenticated();
      
      if (storedUser && hasToken) {
        try {
          await authService.verify();
          setUser(storedUser);
          setUserTeam(storedTeam || 'Sales');
          setIsAdmin(storedIsAdmin);
          setIsAuthenticated(true);
        } catch (error) {
          // Token is invalid, clear storage
          authService.logout();
          localStorage.removeItem('userTeam');
          localStorage.removeItem('isAdmin');
          setUser(null);
          setUserTeam(null);
          setIsAdmin(false);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      // Team and admin status come from backend
      const team = response.team || 'Sales';
      const adminStatus = response.isAdmin || false;
      
      setUser(response.user);
      setUserTeam(team);
      setIsAdmin(adminStatus);
      setIsAuthenticated(true);
      
      localStorage.setItem('userTeam', team);
      localStorage.setItem('isAdmin', adminStatus.toString());
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setUserTeam(null);
      setIsAdmin(false);
      setIsAuthenticated(false);
      localStorage.removeItem('userTeam');
      localStorage.removeItem('isAdmin');
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
    isAdmin,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUserTeam
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
