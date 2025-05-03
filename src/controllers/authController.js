const { createUser } = require('../services/userService');
const { authenticate } = require('../services/authService');

async function register(req, res) {
  const { name, email, password } = req.body;

  // 1) Campos obrigatórios
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: 'Name, email and password are required.' });
  }

  // 2) Validação de formato de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: 'Invalid email format.' });
  }

  // 3) Validação de tamanho mínimo de senha
  if (password.length < 4) {
    return res
      .status(400)
      .json({ error: 'Password must be at least 4 characters long.' });
  }

  try {
    const user = await createUser({ name, email, password });
    // não retornamos a senha, mesmo que hash esteja em select:false
    return res
      .status(201)
      .json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    // 4) Tratamento de conflito de e-mail duplicado
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ error: 'Email already registered.' });
    }
    // 5) Erro genérico
    return res
      .status(500)
      .json({ error: `erro: ${err}` });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: 'Email and password are required.' });
  }
  try {
    const { token } = await authenticate({ email, password });
    return res.json({ token });
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Invalid email or password.' });
  }
}

module.exports = {
  register,
  login,
};