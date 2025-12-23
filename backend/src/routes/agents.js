const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { agents, groups } = require('../config/agents');

// Get all available groups
router.get('/groups', authMiddleware, (req, res) => {
  res.json({
    success: true,
    groups: groups.map(group => ({
      name: group,
      id: group.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
    }))
  });
});

// Get agents for a specific group
router.get('/agents/:group', authMiddleware, (req, res) => {
  const { group } = req.params;
  
  // Decode URL-encoded group name
  const decodedGroup = decodeURIComponent(group);
  
  // Find agents that match the group
  const groupAgents = agents.filter(agent => 
    agent.groups.some(g => g.toLowerCase() === decodedGroup.toLowerCase())
  );
  
  if (groupAgents.length === 0) {
    return res.status(404).json({ 
      success: false, 
      error: 'No agents found for this group' 
    });
  }
  
  res.json({
    success: true,
    group: decodedGroup,
    agents: groupAgents
  });
});

// Get all agents (for Executive group or admin)
router.get('/agents', authMiddleware, (req, res) => {
  res.json({
    success: true,
    agents
  });
});

// Get specific agent details
router.get('/agent/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const agent = agents.find(a => a.id === id);
  
  if (!agent) {
    return res.status(404).json({ 
      success: false, 
      error: 'Agent not found' 
    });
  }
  
  res.json({
    success: true,
    agent
  });
});

module.exports = router;
