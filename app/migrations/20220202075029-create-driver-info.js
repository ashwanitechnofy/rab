'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('driver_infos', {
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
    date_of_birth: {
      type: Sequelize.STRING(15)
    },
    location: {
      type: Sequelize.TEXT
    },
    area_radius: {
      type: Sequelize.STRING(10)
    },
    license_no: {
      type: Sequelize.STRING(10)
    },
    expiry: {
      type: Sequelize.DATE
    },
    license_img: {
      type: Sequelize.STRING(150)
    },
    vehicle_id: {
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
    await queryInterface.dropTable('driver_infos');
  }
};