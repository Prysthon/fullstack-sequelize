// src/app.js
require('dotenv').config();            // 1) carregue .env
const express = require('express');
const { connectDB } = require('./database');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

connectDB();                           // 2) conexão única no cold start

const app = express();                 
app.use(express.json());

app.get('/', (_req, res) => res.status(200).send('API working'));
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

module.exports = app;                  // só exporte a instância