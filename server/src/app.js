const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// MODELOS Y DB
const sequelize = require('./utils/db');
require('./models/User');
require('./models/Room');
require('./models/Reservation');
require('./models/Guest'); // ✅ Importación correcta aquí

// APP
const app = express();
app.use(cors());
app.use(express.json());

// RUTAS
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const statusRoutes = require('./routes/statusRoutes');
const guestRoutes = require('./routes/guestRoutes'); // ✅ Rutas de huéspedes

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/guests', guestRoutes); // ✅

sequelize.sync({ alter: true }) // 💡 Usamos solo una vez y con `alter` para mantener actualizado
  .then(() => {
    console.log('📦 Base de datos sincronizada');
    app.listen(5000, () => {
      console.log('✅ Servidor corriendo en http://localhost:5000');
    });
  })
  .catch((err) => console.error('❌ Error al sincronizar DB:', err));
