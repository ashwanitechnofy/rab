'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('model_years', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      registration_no: {
        type: Sequelize.STRING(20),
        allowNull:false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      vehicle_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      model_id: {
        type: Sequelize.INTEGER,
        allowNull:false
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
    await queryInterface.dropTable('model_years');
  }
};