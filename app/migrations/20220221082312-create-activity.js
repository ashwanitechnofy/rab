'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: { type:Sequelize.INTEGER, allowNull:false},
      user_id: { type:Sequelize.INTEGER, allowNull:false},
      title: { type:Sequelize.STRING(200), allowNull:false},
      price: {type:Sequelize.INTEGER,allowNull:false},
      level:  {type: Sequelize.STRING(30)},
      atitude_level:  {type:Sequelize.STRING(30)},
      atitude_height:  {type:Sequelize.STRING(30)},
      age_from: {type:Sequelize.INTEGER(30),allowNull:false},
      age_to: {type:Sequelize.INTEGER(30),allowNull:false},
      hightlight: {type:Sequelize.TEXT('long')},
      pickup: {type:Sequelize.ENUM('0','1')},
      item_take: {type: Sequelize.TEXT('long') },
      services: {
        type: Sequelize.TEXT('long')
      },
      status: {
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
    await queryInterface.dropTable('activities');
  }
};