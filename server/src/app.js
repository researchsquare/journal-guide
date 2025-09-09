require('dotenv').config();
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const middlewareLoader = require('./middleware/middleware');

const app = express();

middlewareLoader(app);

app.use(express.json());

//Main route
app.use('/api', require('./routes/api'));

//Error Handler should be at the end of all routes
app.use(errorHandler);
const port = process.env.BACKEND_PORT || 5001;

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on 0.0.0.0:${port}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});
