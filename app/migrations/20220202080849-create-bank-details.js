'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bank_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      account_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      account_no: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      ifsc_code: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      primary_bank: {
        type: Sequelize.ENUM('0','1'), 
        defaultValue: "0"
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
    await queryInterface.dropTable('bank_details');
  }
};