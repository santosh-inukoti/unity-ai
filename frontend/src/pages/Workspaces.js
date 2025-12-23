import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import './Workspaces.css';

const Workspaces = () => {
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState('Sales');
  const [workspaces, setWorkspaces] = useState([]);

  const handleNewWorkspace = () => {
    navigate('/agents/all');
  };

  const handleWorkspaceClick = (workspace) => {
    console.log('Opening workspace:', workspace.id);
  };

  return (
    <div className="workspaces-layout">
      <Sidebar />

      <div className="workspaces-main">
        <TopHeader selectedDept={selectedDept} onDeptChange={setSelectedDept} />

        <div className="workspaces-header">
          <div className="page-title">
            <h1>Workspaces</h1>
            <p>Your active conversations for {selectedDept}</p>
          </div>
          <button className="new-workspace-btn" onClick={handleNewWorkspace}>
            + New Workspace
          </button>
        </div>

        <div className="workspaces-content">
          {/* Workspaces List */}
          <div className="workspaces-list">
            {workspaces.length === 0 ? (
              <div className="no-workspaces">
                <p>No workspaces yet. Start a new conversation with an agent!</p>
                <button className="create-btn" onClick={handleNewWorkspace}>
                  Create New Workspace
                </button>
              </div>
            ) : (
              workspaces.map((workspace) => (
                <div
                  key={workspace.id}
                  className="workspace-item"
                  onClick={() => handleWorkspaceClick(workspace)}
                >
                  <div className="workspace-content">
                    <h3 className="workspace-title">{workspace.title}</h3>
                    <p className="workspace-description">{workspace.description}</p>
                    <div className="workspace-meta">
                      <span className="meta-item">
                        <span className="meta-icon">💬</span>
                        {workspace.messages} messages
                      </span>
                      <span className="meta-item">
                        <span className="meta-icon">⏱️</span>
                        {workspace.timestamp}
                      </span>
                    </div>
                  </div>
                  <div className="workspace-arrow">→</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspaces;
