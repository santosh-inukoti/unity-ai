import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { agentsService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Agents.css';

const Agents = () => {
  const { groupId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [groupName, setGroupName] = useState(location.state?.groupName || '');

  useEffect(() => {
    fetchAgents();
  }, [groupId]);

  const fetchAgents = async () => {
    try {
      // Decode the groupId and fetch agents
      const decodedGroup = groupId.replace(/-/g, ' ').replace(/and/g, '&');
      const response = await agentsService.getAgentsByGroup(decodedGroup);
      setAgents(response.agents);
      setGroupName(response.group);
    } catch (err) {
      setError('Failed to load agents. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleBack = () => {
    navigate('/groups');
  };

  if (loading) {
    return (
      <div className="agents-container">
        <div className="loading">Loading agents...</div>
      </div>
    );
  }

  return (
    <div className="agents-container">
      <header className="agents-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={handleBack} className="back-button">
              ← Back to Groups
            </button>
            <h1>Unity AI - {groupName}</h1>
          </div>
          <div className="user-info">
            <span>Welcome, {user?.name || user?.email}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="agents-content">
        <div className="agents-intro">
          <h2>Available AI Agents</h2>
          <p>Select an agent to start using its capabilities</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {agents.length === 0 ? (
          <div className="no-agents">
            <p>No agents available for this group.</p>
          </div>
        ) : (
          <div className="agents-grid">
            {agents.map((agent) => (
              <div key={agent.id} className="agent-card">
                <div className="agent-header">
                  <div className="agent-icon">🤖</div>
                  <div className="agent-badge">{agent.category}</div>
                </div>
                <h3>{agent.name}</h3>
                <p className="agent-description">{agent.description}</p>
                <div className="agent-details">
                  <div className="detail-item">
                    <span className="detail-label">API Endpoint:</span>
                    <code className="detail-value">{agent.apiEndpoint}</code>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Access Groups:</span>
                    <div className="groups-tags">
                      {agent.groups.map((group, index) => (
                        <span key={index} className="group-tag">
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="use-agent-button">
                  Connect to Agent
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Agents;
