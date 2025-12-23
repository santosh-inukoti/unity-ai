import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { agentsService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import './Agents.css';

const Agents = () => {
  const { groupId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { userTeam } = useAuth();
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [groupName, setGroupName] = useState(location.state?.groupName || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedDept, setSelectedDept] = useState(userTeam || 'Sales');

  useEffect(() => {
    setSelectedDept(userTeam || 'Sales');
  }, [userTeam]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        let response;
        const currentTeam = userTeam || 'Sales';
        
        if (groupId === 'all') {
          response = await agentsService.getAllAgents();
          setGroupName('All Agents');
          // Filter by user's team
          const teamAgents = response.agents.filter(agent => 
            agent.groups && agent.groups.includes(currentTeam)
          );
          setAgents(teamAgents);
          setFilteredAgents(teamAgents);
        } else {
          const decodedGroup = groupId.replace(/-/g, ' ').replace(/and/g, '&');
          response = await agentsService.getAgentsByGroup(decodedGroup);
          setGroupName(response.group);
          setAgents(response.agents);
          setFilteredAgents(response.agents);
        }
      } catch (err) {
        setError('Failed to load agents. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [groupId, userTeam]);

  useEffect(() => {
    let filtered = agents;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(agent => {
        const isMulti = agent.isMultiAgent === true;
        return filterType === 'multi' ? isMulti : !isMulti;
      });
    }

    setFilteredAgents(filtered);
  }, [searchTerm, filterType, agents]);

  const getAgentIcon = (category) => {
    const icons = {
      'Sales': '📈',
      'Marketing': '📢',
      'Customer Success': '🎯',
      'Product & Engineering': '⚙️',
      'Finance': '💰',
      'Operations': '📊',
      'Executive': '👔'
    };
    return icons[category] || '🤖';
  };

  if (loading) {
    return (
      <div className="agents-layout">
        <Sidebar />
        <div className="agents-main">
          <div className="loading">Loading agents...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="agents-layout">
      <Sidebar />

      <div className="agents-main">
        <TopHeader selectedDept={selectedDept} onDeptChange={setSelectedDept} />

        <div className="agents-header">
          <div className="page-title">
            <h1>Agents</h1>
            <p>Browse and interact with AI agents for {groupName}</p>
          </div>
        </div>

        <div className="agents-content">
          {/* Filter Section */}
          <div className="agents-filters">
            <div className="search-input">
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}
              >
                ✓ All
              </button>
              <button
                className={`filter-btn ${filterType === 'single' ? 'active' : ''}`}
                onClick={() => setFilterType('single')}
              >
                Single
              </button>
              <button
                className={`filter-btn ${filterType === 'multi' ? 'active' : ''}`}
                onClick={() => setFilterType('multi')}
              >
                🔗 Multi
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          {filteredAgents.length === 0 ? (
            <div className="no-agents">
              <p>No agents found matching your criteria.</p>
            </div>
          ) : (
            <div className="agents-grid">
              {filteredAgents.map((agent) => (
                <div key={agent.id} className="agent-card">
                  <div className="agent-header">
                    <div className="agent-icon">
                      {getAgentIcon(agent.category)}
                    </div>
                    {agent.isMultiAgent && (
                      <span className="multi-agent-badge">Multi-Agent</span>
                    )}
                  </div>

                  <h3 className="agent-name">{agent.name}</h3>
                  <p className="agent-description">{agent.description}</p>

                  <div className="agent-tags">
                    {agent.groups && agent.groups.slice(0, 3).map((group, index) => (
                      <span key={index} className="tag">
                        {group}
                      </span>
                    ))}
                    {agent.groups && agent.groups.length > 3 && (
                      <span className="tag">+{agent.groups.length - 3}</span>
                    )}
                  </div>

                  <button className="start-conversation-btn">
                    Start conversation
                    <span className="arrow">→</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agents;
