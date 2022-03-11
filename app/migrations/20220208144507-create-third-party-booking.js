'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('third_party_bookings', {
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
      vehicle_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
     mobile: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      payment_status: {
        type: Sequelize.ENUM('0','1'),
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
    await queryInterface.dropTable('third_party_bookings');
  }
};