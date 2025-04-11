const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // cambiar a true para ver las queries
  }
);

// Verificación de conexión
sequelize.authenticate()
  .then(() => console.log('✅ Conexión a la base de datos establecida.'))
  .catch((err) => console.error('❌ Error al conectar con la base de datos:', err));

module.exports = sequelize;
