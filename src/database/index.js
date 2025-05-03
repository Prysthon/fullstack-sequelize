const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL conectado');
    await sequelize.sync(); 
    console.log('✅ Tabelas sincronizadas');
  } catch (error) {
    console.error('❌ Erro ao conectar PostgreSQL:', error);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
