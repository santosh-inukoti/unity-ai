const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock user database with team assignments
// TODO: Replace with real database and SSO integration
const mockUsers = {
  'santosh.inukoti@enverus.com': {
    team: 'Sales',
    isAdmin: true,
    name: 'Santosh Inukoti'
  },
  'john.doe@enverus.com': {
    team: 'Sales',
    isAdmin: false,
    name: 'John Doe'
  },
  'jane.smith@enverus.com': {
    team: 'Customer Success',
    isAdmin: false,
    name: 'Jane Smith'
  }
};

// Mock SSO login endpoint - accepts ANY email for testing
router.post('/login', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  
  // Get user info from mock database or use defaults
  const userInfo = mockUsers[email.toLowerCase()] || {
    team: 'Sales',
    isAdmin: false,
    name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())
  };
  
  // Mock user data
  const user = {
    id: Date.now().toString(),
    email,
    name: userInfo.name,
    company: 'Enverus'
  };
  
  // Generate JWT token
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '24h' });
  
  res.json({
    success: true,
    token,
    user,
    team: userInfo.team,
    isAdmin: userInfo.isAdmin
  });
});

// Mock SSO callback endpoint
router.get('/callback', (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
});

// Logout endpoint
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// Verify token endpoint
router.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
