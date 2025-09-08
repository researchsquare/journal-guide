const allowedOrigins = [
  'http://localhost:3000' // local frontend site
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

module.exports = corsOptions;
