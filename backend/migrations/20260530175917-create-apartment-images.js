'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ApartmentImages', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      apartmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alt: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sortOrder: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isCover: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable('ApartmentImages')
  }
}
