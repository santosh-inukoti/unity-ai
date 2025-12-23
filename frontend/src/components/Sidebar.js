import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { icon: '🏠', label: 'Home', path: '/dashboard' },
    { icon: '🎯', label: 'Agents', path: '/agents/all' },
    // { icon: '📚', label: 'Workspaces', path: '/workspaces' }, // TODO: Enable when ready
    // { icon: '📊', label: 'Reports', path: '/reports' }, // TODO: Enable when ready
  ];

  const bottomMenuItems = [
    { icon: '⚙️', label: 'Settings', path: '/settings' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const isActive = (path) => {
    if (path === '/agents/all') {
      return location.pathname.startsWith('/agents');
    }
    return location.pathname === path;
  };

  return (
    <>
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        ☰
      </button>

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            {isCollapsed && <div className="logo-icon">E</div>}
            {!isCollapsed && <span className="logo-text">Enverus Unity</span>}
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
              title={isCollapsed ? item.label : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {!isCollapsed && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="sidebar-bottom">
          <nav className="sidebar-nav-bottom">
            {bottomMenuItems.map((item) => (
              <button
                key={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => handleNavigation(item.path)}
                title={isCollapsed ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="nav-label">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Collapse Button */}
          <button
            className="collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            <span className="collapse-icon">
              {isCollapsed ? '>' : '<'}
            </span>
            {!isCollapsed && <span className="collapse-label">Collapse</span>}
          </button>
        </div>
      </aside>

      {isMobileOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
