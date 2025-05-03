const { Sequelize } = require('sequelize');
const connectionString = process.env.DATABASE_URL;
const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: { ssl: { rejectUnauthorized: false } }  // necessário no Supabase
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL (Supabase) conectado');
    await sequelize.sync();
  } catch (err) {
    console.error('❌ Erro ao conectar no PostgreSQL:', err);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
