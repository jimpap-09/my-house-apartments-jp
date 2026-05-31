'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'userId' })
      Review.belongsTo(models.Apartment, { foreignKey: 'apartmentId' })
    }
  }

  Review.init({
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    apartmentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  })

  return Review
}
