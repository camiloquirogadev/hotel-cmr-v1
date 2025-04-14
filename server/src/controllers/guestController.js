const Guest = require("../models/Guest");

exports.getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.findAll();
    res.json(guests);
  } catch (err) {
    console.error("Error al obtener huéspedes:", err);
    res.status(500).json({ error: "Error al obtener huéspedes" });
  }
};

exports.createGuest = async (req, res) => {
  try {
    const guest = await Guest.create(req.body);
    res.status(201).json(guest);
  } catch (err) {
    console.error("Error al crear huésped:", err);
    res.status(500).json({ error: "Error al crear huésped" });
  }
};

exports.updateGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const guest = await Guest.findByPk(id);
    if (!guest) return res.status(404).json({ error: "Huésped no encontrado" });

    await guest.update(req.body);
    res.json(guest);
  } catch (err) {
    console.error("Error al actualizar huésped:", err);
    res.status(500).json({ error: "Error al actualizar huésped" });
  }
};

exports.deleteGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const guest = await Guest.findByPk(id);
    if (!guest) return res.status(404).json({ error: "Huésped no encontrado" });

    await guest.destroy();
    res.status(204).end();
  } catch (err) {
    console.error("Error al eliminar huésped:", err);
    res.status(500).json({ error: "Error al eliminar huésped" });
  }
};
