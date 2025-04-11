const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// MODELOS Y DB
const sequelize = require('./utils/db');
require('./models/User');
require('./models/Room');
require('./models/Reservation');

// APP
const app = express();
app.use(cors());
app.use(express.json());

// RUTAS
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);

// CONEXIÓN A LA DB
sequelize.sync()
  .then(() => console.log('📦 Base de datos sincronizada'))
  .catch((err) => console.error('❌ Error al sincronizar DB:', err));

module.exports = app;
