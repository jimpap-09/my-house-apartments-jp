'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Apartments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      pricePerNight: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      urlCover: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Apartments')
  }
}
