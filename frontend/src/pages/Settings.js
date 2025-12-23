import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import './Settings.css';

const Settings = () => {
  const { user, userTeam, isAdmin, updateUserTeam } = useAuth();
  const [selectedDept, setSelectedDept] = useState(userTeam || 'Sales');
  const [sidebarCollapsedByDefault, setSidebarCollapsedByDefault] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [webAccess, setWebAccess] = useState(false);

  useEffect(() => {
    // Sync with user's current team
    setSelectedDept(userTeam || 'Sales');
  }, [userTeam]);

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

  const handleTeamSelect = (deptName) => {
    setSelectedDept(deptName);
  };

  const handleSaveChanges = () => {
    // Update the user's team across the application
    updateUserTeam(selectedDept);
    console.log('Settings saved', {
      team: selectedDept,
      sidebarCollapsedByDefault,
      compactMode,
      emailNotifications,
      webAccess
    });
    // TODO: Save all settings to backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-layout">
      <Sidebar />

      <div className="settings-main">
        <TopHeader selectedDept={selectedDept} onDeptChange={setSelectedDept} />

        <div className="settings-container">
          <h1 className="settings-title">Settings</h1>

          {/* Profile Section */}
          <section className="settings-section">
            <div className="section-header">
              <span className="section-icon">👤</span>
              <h2>Profile</h2>
            </div>
            <div className="profile-card">
              <div className="profile-avatar">
                {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="profile-info">
                <div className="profile-name">{user?.name || user?.email?.split('@')[0] || 'User'}</div>
                <div className="profile-email">{user?.email}</div>
                <div className="profile-badges">
                  <span className="badge role-badge">{userTeam}</span>
                  {isAdmin && <span className="badge admin-badge">Admin</span>}
                </div>
              </div>
            </div>
          </section>

          {/* Default Team Section - Only show for admin users */}
          {isAdmin && (
            <section className="settings-section">
              <div className="section-header">
                <span className="section-icon">🤝</span>
                <h2>Default Team</h2>
                <span className="admin-only-badge">Admin Only</span>
              </div>
              <p className="section-description">As an admin, you can view agents from any team.</p>
              <div className="team-grid">
                {departments.map((dept) => (
                  <button
                    key={dept.name}
                    className={`team-card ${selectedDept === dept.name ? 'active' : ''}`}
                    onClick={() => handleTeamSelect(dept.name)}
                  >
                    <div className="team-icon">{dept.icon}</div>
                    <div className="team-name">{dept.name}</div>
                    {selectedDept === dept.name && <div className="team-checkmark">✓</div>}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Display Section */}
          <section className="settings-section">
            <div className="section-header">
              <span className="section-icon">⚙️</span>
              <h2>Display</h2>
            </div>
            <div className="settings-options">
              <div className="settings-option">
                <div className="option-content">
                  <h3>Sidebar collapsed by default</h3>
                  <p>Start with a minimized sidebar</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={sidebarCollapsedByDefault}
                    onChange={(e) => setSidebarCollapsedByDefault(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="settings-option">
                <div className="option-content">
                  <h3>Compact mode</h3>
                  <p>Reduce spacing for denser layout</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={compactMode}
                    onChange={(e) => setCompactMode(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="settings-section">
            <div className="section-header">
              <span className="section-icon">🔔</span>
              <h2>Notifications</h2>
            </div>
            <div className="settings-options">
              <div className="settings-option">
                <div className="option-content">
                  <h3>Email notifications</h3>
                  <p>Receive updates via email</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </section>

          {/* Chat Defaults Section */}
          <section className="settings-section">
            <div className="section-header">
              <span className="section-icon">💬</span>
              <h2>Chat Defaults</h2>
            </div>
            <div className="settings-options">
              <div className="settings-option">
                <div className="option-content">
                  <h3>Web access enabled by default</h3>
                  <p>Allow agents to search the web</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={webAccess}
                    onChange={(e) => setWebAccess(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </section>

          {/* Save Changes Button */}
          <button className="save-changes-btn" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
