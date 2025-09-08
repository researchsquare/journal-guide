require('dotenv').config();
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const middlewareLoader = require('./middleware/middleware');

const app = express();

middlewareLoader(app);

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Main endpoint
app.get('/', (req, res) => {
  res.json({
    message: `Hello from Express backend! (${process.env.NODE_ENV || 'development'})`,
    environment: process.env.NODE_ENV || 'development'
  });
});

// API endpoint
app.get('/api/config', (req, res) => {
  res.json({
    backend: 'working',
    environment: process.env.NODE_ENV || 'development'
  });
});

//Error Handler should be at the end of all routes
app.use(errorHandler);
const port = process.env.BACKEND_PORT || 5001;

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on 0.0.0.0:${port}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});
