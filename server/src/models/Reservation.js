const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Room = require('./Room');
const User = require('./User');

const Reservation = sequelize.define('Reservation', {
  checkin: { type: DataTypes.DATE, allowNull: false },
  checkout: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'pendiente' } // pendiente | confirmada | cancelada
});

// Relaciones
Room.hasMany(Reservation, { foreignKey: 'roomId' });
Reservation.belongsTo(Room);

User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User);

module.exports = Reservation;
