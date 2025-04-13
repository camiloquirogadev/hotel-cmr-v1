const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Reservation = require('../models/Reservation');

router.get('/', async (req, res) => {
  try {
    const totalRooms = await Room.count();
    const occupiedRooms = await Room.count({ where: { status: 'ocupada' } });
    const availableRooms = await Room.count({ where: { status: 'disponible' } });

    const totalReservations = await Reservation.count();
    const totalRevenue = await Reservation.sum('price') || 0;

    res.json({
      totalRooms,
      occupiedRooms,
      availableRooms,
      totalReservations,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener métricas' });
  }
});

module.exports = router;
