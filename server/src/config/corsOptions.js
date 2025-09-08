const allowedOrigins = [
  'http://localhost:3000'
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

module.exports = corsOptions;
