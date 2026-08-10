'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        comment: 'Εξαιρετική διαμονή, πολύ καθαρό και ήσυχο μέρος!',
        rating: 5,
        userId: 1,
        apartmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: 'Πολύ καλή τοποθεσία, αλλά το air condition έκανε λίγο θόρυβο.',
        rating: 4,
        userId: 2,
        apartmentId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {})
  }
}
