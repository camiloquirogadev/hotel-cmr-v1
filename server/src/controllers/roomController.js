const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRooms = async (req, res) => {
  const rooms = await Room.findAll();
  res.json(rooms);
};