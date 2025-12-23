const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock SSO login endpoint
// In production, this would integrate with Enverus SSO (SAML/OAuth2)
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock authentication - In production, validate against Enverus SSO
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  // Mock user data - In production, this would come from SSO
  const user = {
    id: Date.now().toString(),
    email,
    name: email.split('@')[0],
    company: 'Enverus'
  };
  
  // Generate JWT token
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '24h' });
  
  res.json({
    success: true,
    token,
    user
  });
});

// Mock SSO callback endpoint
router.get('/callback', (req, res) => {
  // In production, this would handle SAML/OAuth2 callback
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
