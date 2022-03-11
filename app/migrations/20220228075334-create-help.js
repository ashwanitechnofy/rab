'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('help', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull:false
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.TEXT('long')
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
    await queryInterface.dropTable('help');
  }
};