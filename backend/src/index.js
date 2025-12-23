require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const agentsRoutes = require('./routes/agents');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/auth', authRoutes);
app.use('/api', agentsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path
  });

  const status = err.status || 500;
  const message = NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  res.status(status).json({ error: message });
});

// Start server
const server = app.listen(PORT, () => {
  logger.info(`Backend running on port ${PORT}`);
  logger.info(`Environment: ${NODE_ENV}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('Shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

module.exports = app;
