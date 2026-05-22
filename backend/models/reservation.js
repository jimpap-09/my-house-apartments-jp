'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      Reservation.belongsTo(models.Apartment, { foreignKey: 'apartmentId', onDelete: 'CASCADE' });
      Reservation.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      // define association here
    }
  }
  Reservation.init({
    apartmentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    guestName: DataTypes.STRING,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};