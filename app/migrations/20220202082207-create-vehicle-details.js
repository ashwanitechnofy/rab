'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vehicle_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull:false
      },
      company_id: {
        type: Sequelize.INTEGER(11),
        allowNull:false
      },
      model_id: {
        type: Sequelize.INTEGER(11),
        allowNull:false
      },
      registration_no: {
        type: Sequelize.INTEGER(11),
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
    await queryInterface.dropTable('vehicle_details');
  }
};