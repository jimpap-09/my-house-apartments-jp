'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApartmentImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ApartmentImage.belongsTo(models.Apartment, { foreignKey: 'apartmentId', as: 'apartment', onDelete: 'CASCADE' });
      // define association here
    }
  }
  ApartmentImage.init({
    apartmentId: DataTypes.INTEGER,
    url: DataTypes.STRING,
    alt: DataTypes.STRING,
    sortOrder: DataTypes.INTEGER,
    isCover: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ApartmentImage',
  });
  return ApartmentImage;
};