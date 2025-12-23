const express = require('express');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const router = express.Router();

// User database with team assignments
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

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// Validate email format
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Login endpoint
router.post('/login', (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const emailLower = email.toLowerCase();
    const userInfo = mockUsers[emailLower] || {
      team: 'Sales',
      isAdmin: false,
      name: emailLower.split('@')[0]
        .split('.')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    };

    const user = {
      id: emailLower.replace(/[^a-z0-9]/g, ''),
      email: emailLower,
      name: userInfo.name,
      company: 'Enverus'
    };

    const token = generateToken(user);
    logger.info(`Login: ${emailLower}`);

    res.json({
      success: true,
      token,
      user,
      team: userInfo.team,
      isAdmin: userInfo.isAdmin
    });
  } catch (error) {
    next(error);
  }
});

// SSO callback
router.get('/callback', (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
});

// Logout
router.post('/logout', (req, res) => {
  try {
    logger.info('User logout');
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Logout failed' });
  }
});

// Verify token
router.get('/verify', (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    next(error);
  }
});

module.exports = router;
