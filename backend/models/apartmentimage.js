'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ApartmentImage extends Model {
    static associate(models) {
      ApartmentImage.belongsTo(models.Apartment, { foreignKey: 'apartmentId' })
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
  })

  return ApartmentImage
}
