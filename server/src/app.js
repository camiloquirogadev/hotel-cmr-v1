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

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);

// CONEXIÓN A LA DB

const statusRoutes = require('./routes/statusRoutes');
app.use('/api/status', statusRoutes);

sequelize.sync()
  .then(() => {
    console.log('📦 Base de datos sincronizada');
    sequelize.sync({ alter: true }) 
    // 🚀 Escuchar el puerto una vez que sincroniza
    app.listen(5000, () => {
      console.log('✅ Servidor corriendo en http://localhost:5000');
    });
  })
  .catch((err) => console.error('❌ Error al sincronizar DB:', err));