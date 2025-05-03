const User = require('../models/User');

async function createUser({ name, email, password }) {
  // Tenta criar o usuário; unique constraint do Mongoose cuidará do email duplicado
  const user = new User({ name, email, password });
  await user.save();
  return user;
}

module.exports = {
  createUser,
};
