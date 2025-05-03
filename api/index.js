// api/index.js
const serverless = require('serverless-http');
require('dotenv').config();
const app = require('../src/app');

// opcional: permitir que o lambda retorne mesmo com conexões abertas
// (não é obrigatório, mas pode ajudar no cold-start)
console.log('ACHOU INDEX');
module.exports = serverless(app, {
  request: (req, event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
  }
});
