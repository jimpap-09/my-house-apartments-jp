'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apartment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Apartment.hasMany(models.ApartmentImage, { foreignKey: 'apartmentId', as: 'images' });
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