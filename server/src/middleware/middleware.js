const helmet = require('helmet');
const cors = require('cors');
const corsOptions = require('../config/corsOptions');
const xhrRequired = require('./xhrRequired');

function middlewareLoader(app) {
  app.use(helmet());
  app.use(xhrRequired);
  app.use(cors(corsOptions));
}

module.exports = middlewareLoader;
