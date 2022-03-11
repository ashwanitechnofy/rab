'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coupons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM('Percentage','Fixed Amount'),
        defaultValue:'Fixed Amount'
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull:false,
        unique:true
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      from: {
        type: Sequelize.DATE,
        allowNull:false
      },
      to: {
        type: Sequelize.DATE,
        allowNull:false
      },
      upTo_value: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM('1','0'),
        defaultValue:'1'
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
    await queryInterface.dropTable('coupons');
  }
};