const Reservation = require('../models/Reservation');
const Room = require('../models/Room');

// Definir relación (asegúrate que también esté en el modelo)
Reservation.belongsTo(Room, { foreignKey: 'roomId' });

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: {
        model: Room,
        attributes: ['number', 'type']
      }
    });

    const formatted = reservations.map((r) => ({
      id: r.id,
      guestName: r.guestName,
      roomNumber: r.Room?.number || null,
      checkInDate: r.checkInDate,
      checkOutDate: r.checkOutDate,
      status: r.status,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("❌ Error en getAllReservations:", err);
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.json(reservation);
  } catch (err) {
    console.error("❌ Error al crear reserva:", err);
    res.status(500).json({ error: 'Error al crear reserva' });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    await Reservation.update(req.body, { where: { id } });
    const updated = await Reservation.findByPk(id);
    res.json(updated);
  } catch (err) {
    console.error("❌ Error al actualizar reserva:", err);
    res.status(500).json({ error: 'Error al actualizar reserva' });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    await Reservation.destroy({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error al eliminar reserva:", err);
    res.status(500).json({ error: 'Error al eliminar reserva' });
  }
};