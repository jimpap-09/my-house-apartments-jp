'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('ApartmentImages', {
      fields: ['apartmentId'],
      type: 'foreign key',
      name: 'fkey_apartment-images_apartmentId',
      references: {
        table: 'Apartments',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })

    await queryInterface.addConstraint('Reviews', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fkey_reviews_userId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })

    await queryInterface.addConstraint('Reviews', {
      fields: ['apartmentId'],
      type: 'foreign key',
      name: 'fkey_reviews_apartmentId',
      references: {
        table: 'Apartments',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })

    await queryInterface.addConstraint('Reservations', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fkey_reservations_userId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })

    await queryInterface.addConstraint('Reservations', {
      fields: ['apartmentId'],
      type: 'foreign key',
      name: 'fkey_reservations_apartmentId',
      references: {
        table: 'Apartments',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ApartmentImages', 'fkey_apartment-images_apartmentId')
    await queryInterface.removeConstraint('Reviews', 'fkey_reviews_userId')
    await queryInterface.removeConstraint('Reviews', 'fkey_reviews_apartmentId')
    await queryInterface.removeConstraint('Reservations', 'fkey_reservations_userId')
    await queryInterface.removeConstraint('Reservations', 'fkey_reservations_apartmentId')
  }
}
