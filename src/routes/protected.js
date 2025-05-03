const express = require('express');
const authMiddleware = require('../middlewares/authmiddleware');

const router = express.Router();

router.get('/', authMiddleware, (req, res) => {
  res.json({ message: 'Acesso autorizado', userId: req.userId });
});

module.exports = router;
