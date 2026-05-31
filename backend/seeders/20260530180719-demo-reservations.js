'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reservations', [

    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reservations', null, {})
  }
}
