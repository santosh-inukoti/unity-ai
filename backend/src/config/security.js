module.exports = {
  // JWT Configuration
  jwt: {
    expiresIn: process.env.JWT_EXPIRY || '8h',
    algorithm: 'HS256'
  },
  
  // CORS Configuration
  cors: {
    production: ['https://unity-ai.enverus.com'],
    development: ['http://localhost:3000']
  },
  
  // Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100
  },
  
  // Session Configuration
  session: {
    maxAge: 8 * 60 * 60 * 1000, // 8 hours
    secure: process.env.NODE_ENV === 'production'
  }
};
