'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Reviews', {
      fields: ['apartmentId'],
      type: 'foreign key',
      name: 'fkey_reviews_apartment',
      references: { table: 'Apartments', field: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('Reservations', {
      fields: ['apartmentId'],
      type: 'foreign key',
      name: 'fkey_reservations_apartment',
      references: { table: 'Apartments', field: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('Reviews', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fkey_reviews_user',
      references: { table: 'Users', field: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('Reservations', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fkey_reservations_user',
      references: { table: 'Users', field: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Reviews', 'fkey_reviews_apartment');
    await queryInterface.removeConstraint('Reservations', 'fkey_reservations_apartment');
    await queryInterface.removeConstraint('Reviews', 'fkey_reviews_user');
    await queryInterface.removeConstraint('Reservations', 'fkey_reservations_user');
  }
};
