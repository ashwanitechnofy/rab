'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      first_name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      role_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        email:true
      },
      password: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING(5),
      },
      mobile_no: {
        type: Sequelize.INTEGER(11),
      },
      alternate_mobile:{
        type: Sequelize.INTEGER(11),
      },
      age: {
        type: Sequelize.INTEGER(5),
        allowNull: false
      },
      photo: {
        type: Sequelize.TEXT
      },
      lat: {
        type: Sequelize.DECIMAL(10,2)
      },
      long: {
        type: Sequelize.DECIMAL(10,2)
      },
      address: {
        type: Sequelize.TEXT
       },
       address1: {
        type: Sequelize.TEXT
       },
       city: {
        type: Sequelize.STRING(50)
       },
       state: {
        type: Sequelize.STRING(50)
       },
       country: {
        type: Sequelize.STRING(50)
       },
       code: {
        type: Sequelize.STRING(50)
       },
       status: {
        type: Sequelize.ENUM('0','1'), 
        defaultValue: "0"
      },
       reset_token: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Users');
  }
};