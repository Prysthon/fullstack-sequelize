const User = require('../models/User');

async function createUser({ name, email, password }) {
  const user = await User.create({ name, email, password });
  return user;
}

module.exports = { createUser };
