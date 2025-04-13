const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Room = require('./Room');

const Reservation = sequelize.define('Reservation', {
  guestName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  checkInDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  checkOutDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'confirmada',
  },
  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Room,
      key: 'id'
    }
  }
});

// Relación con habitación
Reservation.belongsTo(Room, { foreignKey: 'roomId' });

module.exports = Reservation;