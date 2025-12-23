import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { agentsService } from '../services/api';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import './Dashboard.css';

const Dashboard = () => {
  const { user, userTeam, updateUserTeam } = useAuth();
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState(userTeam || 'Sales');

  useEffect(() => {
    setSelectedDept(userTeam || 'Sales');
  }, [userTeam]);

  useEffect(() => {
    fetchAgents();
  }, [selectedDept, userTeam]);

  const fetchAgents = async () => {
    try {
      const response = await agentsService.getAllAgents();
      const currentTeam = selectedDept || userTeam || 'Sales';
      // Filter agents based on user's team access and single-topic only
      const userTeamAgents = response.agents.filter(agent => 
        agent.groups && 
        agent.groups.includes(currentTeam) &&
        !agent.isMultiAgent
      );
      setAgents(userTeamAgents);
    } catch (err) {
      console.error('Failed to load agents:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeptChange = (dept) => {
    setSelectedDept(dept);
    updateUserTeam(dept);
  };

  const userName = user?.name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <div className="dashboard-main">
        <TopHeader selectedDept={selectedDept} onDeptChange={handleDeptChange} />

        <div className="dashboard-header">
          <h1>Hi, {userName} 👋</h1>
          <p className="workspace-status">
            <span className="status-dot"></span>
            1 Workspace Active
          </p>
        </div>

        <div className="dashboard-content">
          {/* At a Glance Section */}
          <section className="at-a-glance">
            <h2>At a Glance</h2>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon total-agents">🤖</div>
                <div className="metric-info">
                  <div className="metric-value">{agents.length}</div>
                  <div className="metric-label">Total Agents</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon active-chats">💬</div>
                <div className="metric-info">
                  <div className="metric-value">0</div>
                  <div className="metric-label">Active Chats</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon total-sessions">📊</div>
                <div className="metric-info">
                  <div className="metric-value">0</div>
                  <div className="metric-label">Total Sessions</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon multi-agent">🔗</div>
                <div className="metric-info">
                  <div className="metric-value">0</div>
                  <div className="metric-label">Multi-Agent</div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Start Section */}
          <section className="quick-start">
            <h2>Quick Start</h2>
            <div className="quick-start-grid">
              <button className="quick-start-card" onClick={() => navigate('/agents/all')}>
                <div className="card-icon">🚀</div>
                <div className="card-text">
                  <h3>New Chat</h3>
                  <p>Start a conversation with an AI agent</p>
                </div>
              </button>
              <button className="quick-start-card" onClick={() => navigate('/agents/all')}>
                <div className="card-icon">👥</div>
                <div className="card-text">
                  <h3>Browse Agents</h3>
                  <p>Explore all available AI agents</p>
                </div>
              </button>
              <button className="quick-start-card" disabled title="Coming soon">
                <div className="card-icon">📁</div>
                <div className="card-text">
                  <h3>View Workspaces</h3>
                  <p>Manage your active workspaces</p>
                </div>
              </button>
            </div>
          </section>

          {/* Single-Topic Agents Section */}
          <section className="single-topic-agents">
            <div className="section-header">
              <h2>Single-Topic Agents</h2>
              <button className="view-all-btn" onClick={() => navigate('/agents/all')}>
                View All →
              </button>
            </div>
            <div className="agents-grid">
              {loading ? (
                <div className="loading-state">Loading agents...</div>
              ) : agents.length === 0 ? (
                <div className="no-agents-state">
                  <p>No agents available yet. Check back soon!</p>
                </div>
              ) : (
                agents.map((agent) => (
                  <div key={agent.id} className="agent-card-mini">
                    <div className="agent-card-header">
                      <div className="agent-avatar">🤖</div>
                      <span className="agent-badge">{agent.category}</span>
                    </div>
                    <h3>{agent.name}</h3>
                    <p>{agent.description}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
