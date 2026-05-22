'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.Apartment, { foreignKey: 'apartmentId', onDelete: 'CASCADE' });
      Review.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      // define association here
    }
  }
  Review.init({
    apartmentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};