const {pg} = require('pg');
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Inicializa o Sequelize usando a URL completa do Supabase/Pooler
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // necessário para conexões SSL em serverless
    },
  },
  logging: false, // desativa logs SQL
});

async function connectDB() {
  try {
    // 1) Autentica a conexão
    await sequelize.authenticate();
    console.log('✅ PostgreSQL conectado');

    // 2) Em ambiente de desenvolvimento, sincroniza modelos (cria tabelas)
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync();
      console.log('✅ Tabelas sincronizadas (dev)');
    }
  } catch (err) {
    console.error('❌ Erro ao conectar no PostgreSQL:', err);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };