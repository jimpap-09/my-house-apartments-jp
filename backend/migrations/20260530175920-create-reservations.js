'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      checkIn: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      checkOut: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      apartmentId: {
        type: Sequelize.INTEGER,
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

    await queryInterface.addIndex('Reservations', ["apartmentId","checkIn","checkOut"], {
      name: 'idx_reservations_apartmentId_checkIn_checkOut'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reservations')
  }
}
