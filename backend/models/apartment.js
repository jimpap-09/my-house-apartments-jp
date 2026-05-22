'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apartment extends Model {
    static associate(models) {
      Apartment.hasMany(models.Review, { foreignKey: 'apartmentId' });
      Apartment.hasMany(models.Reservation, { foreignKey: 'apartmentId' });
      // define association here
    }
  }
  Apartment.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    pricePerNight: DataTypes.FLOAT,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Apartment',
  });
  return Apartment;
};