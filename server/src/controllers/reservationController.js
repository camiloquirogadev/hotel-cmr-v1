const Reservation = require('../models/Reservation');
const Room = require('../models/Room');

exports.createReservation = async (req, res) => {
  const { checkin, checkout, roomId, userId } = req.body;
  try {
    const existing = await Reservation.findOne({
      where: { roomId, status: 'confirmada' }
    });
    if (existing) return res.status(400).json({ error: 'La habitación ya está reservada.' });

    const reservation = await Reservation.create({ checkin, checkout, roomId, userId, status: 'confirmada' });
    await Room.update({ status: 'ocupada' }, { where: { id: roomId } });

    res.json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllReservations = async (req, res) => {
  const reservations = await Reservation.findAll({ include: Room });
  res.json(reservations);
};