'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      Reservation.belongsTo(models.User, { foreignKey: 'userId' })
      Reservation.belongsTo(models.Apartment, { foreignKey: 'apartmentId' })
    }
  }

  Reservation.init({
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    apartmentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reservation',
  })

  return Reservation
}
