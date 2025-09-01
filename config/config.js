const path = require('path');

const env = process.env.NODE_ENV || 'development';

const config = require(path.resolve(__dirname, 'config', `aje-${env}.js`));

module.exports = config;
