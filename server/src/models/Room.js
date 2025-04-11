const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Room = sequelize.define('Room', {
  number: { type: DataTypes.STRING, allowNull: false, unique: true },
  type: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'disponible' } // disponible | ocupada | mantenimiento
});

module.exports = Room;
