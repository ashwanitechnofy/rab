'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vehicle_id: { type:Sequelize.STRING, allowNull:false},
      user_id: { type:Sequelize.INTEGER, allowNull:false},
      quanity: { type:Sequelize.INTEGER, allowNull:false},
      from:  {type:Sequelize.DATEONLY, allowNull:false},
      to: {type:Sequelize.DATEONLY, allowNull:false},
      coupon_id: Sequelize.INTEGER,
      discount_price: Sequelize.INTEGER,
      discount_coupon: Sequelize.INTEGER,
      amount: {type:Sequelize.INTEGER,allowNull:false},
      grand_total: {type:Sequelize.INTEGER,allowNull:false},
      status: {
        type: Sequelize.ENUM('0','1','2'),
        defaultValue:'0'
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
    await queryInterface.dropTable('bookings');
  }
};