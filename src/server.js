// 1) carrega .env antes de todo o resto
require('dotenv').config();

const app = require('./app');

// 3) inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
