const serverless = require('serverless-http');
require('dotenv').config();
const app = require('../src/app');

module.exports = serverless(app);
