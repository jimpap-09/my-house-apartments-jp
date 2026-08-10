'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reservations', [
      {
        checkIn: '2024-07-01',
        checkOut: '2024-07-10',
        userId: 1,
        apartmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        checkIn: '2024-07-11',
        checkOut: '2024-07-20',
        userId: 2,
        apartmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        checkIn: '2024-07-15',
        checkOut: '2024-07-20',
        userId: 1,
        apartmentId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        checkIn: '2024-08-21',
        checkOut: '2024-08-30',
        userId: 2,
        apartmentId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reservations', null, {})
  }
}
