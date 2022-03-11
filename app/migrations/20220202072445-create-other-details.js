'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('other_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull:false
      },
      adventure_level: {
        type: Sequelize.INTEGER(5)
       },
       activity_diff: {
        type: Sequelize.STRING(15)
       },
      visiting_card: {
        type: Sequelize.ENUM('0','1'), 
         defaultValue: "0"
      },
      visiting_image: {
        type: Sequelize.STRING(200)
      },
      certificate: {
        type: Sequelize.STRING(200)
      },
      description: {
        type: Sequelize.TEXT('long'),
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
    await queryInterface.dropTable('other_details');
  }
};