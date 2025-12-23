import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './TopHeader.css';

const TopHeader = ({ selectedDept = 'Sales', onDeptChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, userTeam } = useAuth();
  const navigate = useNavigate();

  const departments = [
    { name: 'Sales', icon: '📈' },
    { name: 'Marketing', icon: '📢' },
    { name: 'Customer Success', icon: '❤️' },
    { name: 'Product & Engineering', icon: '💻' },
    { name: 'HR', icon: '👥' },
    { name: 'Finance', icon: '💵' },
    { name: 'Operations', icon: '🔧' },
    { name: 'Executive', icon: '👑' },
  ];

  // Get current department name and icon
  const currentDeptName = selectedDept || userTeam || 'Sales';
  const currentDept = departments.find(d => d.name === currentDeptName) || departments[0];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSettings = () => {
    navigate('/settings');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="top-header">
      <div className="header-left">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search agents, workspaces, reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-divider">/</span>
        </div>
      </div>

      <div className="header-right">
        <div className="dept-selector">
          <span className="dept-selector-icon">{currentDept.icon}</span>
          <span className="dept-selector-name">{currentDept.name}</span>
        </div>
        <div className="user-menu-container">
          <button 
            className="header-icon-btn user-btn" 
            title="User Menu"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            👤
          </button>
          
          {isUserMenuOpen && (
            <div className="user-menu-dropdown">
              <div className="user-menu-header">
                <div className="user-menu-avatar">
                  {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="user-menu-info">
                  <div className="user-menu-name">{user?.name || user?.email?.split('@')[0] || 'User'}</div>
                  <div className="user-menu-email">{user?.email}</div>
                </div>
              </div>
              
              <div className="user-menu-divider"></div>
              
              <button className="user-menu-item" onClick={handleSettings}>
                Settings
              </button>
              
              <button className="user-menu-item sign-out" onClick={handleLogout}>
                Sign out
              </button>
            </div>
          )}
        </div>
        <button className="menu-toggle">⋮</button>
      </div>
      
      {isUserMenuOpen && (
        <div 
          className="user-menu-overlay" 
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default TopHeader;
