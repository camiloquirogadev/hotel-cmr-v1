const express = require('express');
const router = express.Router();
const sequelize = require('../utils/db');

router.get('/', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: '✅ PostgreSQL conectado correctamente.' });
  } catch (error) {
    res.status(500).json({ status: '❌ Error al conectar con PostgreSQL.', error: error.message });
  }
});

module.exports = router;
