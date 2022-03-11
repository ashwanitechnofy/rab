'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking_adventurers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      booking_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      first_name: {
        type: Sequelize.STRING(200),
        allowNull:false,
      },
      last_name: {
        type: Sequelize.STRING(200),
        allowNull:false,
      },
      age: {
        type: Sequelize.STRING(200),
        allowNull:false,
      },
      gender: {
        type: Sequelize.STRING(200),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('booking_adventurers');
  }
};