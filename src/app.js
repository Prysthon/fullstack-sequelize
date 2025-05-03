const express = require('express');

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const connectDB = require('./database/index');

connectDB();   
const app = express();

// Middlewares
app.use(express.json());

// Rotas
app.get('/', (_request, response) => {
  response.status(200).json('api funcionando');
});
app.use('/', authRoutes);
app.use('/protected', protectedRoutes);


module.exports = app;
