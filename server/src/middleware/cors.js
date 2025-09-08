const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5001',
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

module.exports = corsOptions;
