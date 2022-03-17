'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(20)
      },
      role_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        email:true
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      mobile_no: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: false
      },
      country:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      state:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      city:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      address: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      pin_code: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      landmark: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      image: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('0','1'), 
        defaultValue: "0",
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
  
};