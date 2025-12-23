import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { agentsService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Groups.css';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await agentsService.getGroups();
      setGroups(response.groups);
    } catch (err) {
      setError('Failed to load groups. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGroupClick = (group) => {
    navigate(`/agents/${group.id}`, { state: { groupName: group.name } });
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="groups-container">
        <div className="loading">Loading groups...</div>
      </div>
    );
  }

  return (
    <div className="groups-container">
      <header className="groups-header">
        <div className="header-content">
          <h1>Unity AI</h1>
          <div className="user-info">
            <span>Welcome, {user?.name || user?.email}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="groups-content">
        <div className="groups-intro">
          <h2>Select Your Team</h2>
          <p>Choose your department to access specialized AI agents</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="groups-grid">
          {groups.map((group) => (
            <div
              key={group.id}
              className="group-card"
              onClick={() => handleGroupClick(group)}
            >
              <div className="group-icon">
                {getGroupIcon(group.name)}
              </div>
              <h3>{group.name}</h3>
              <p>Access {group.name} AI agents</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to get icons for each group
const getGroupIcon = (groupName) => {
  const icons = {
    'Sales': '💼',
    'Marketing': '📢',
    'Customer Success': '🎯',
    'Product & Engineering': '⚙️',
    'Finance': '💰',
    'Operations': '📊',
    'Executive': '👔'
  };
  return icons[groupName] || '🤖';
};

export default Groups;
