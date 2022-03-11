'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activity_others', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      activity_id: { type:Sequelize.INTEGER,allowNull:false},
      user_id: { type:Sequelize.INTEGER,allowNull:false},
      duration: {type:Sequelize.ENUM('single','multiple'),defaultValue:'single'},
      duration_date: {type:Sequelize.DATEONLY},
      duration_time: {type:Sequelize.TIME},
      capacity_day: {type:Sequelize.INTEGER},
      capacity_appointment: {type:Sequelize.INTEGER},
      itinerary: { type:Sequelize.TEXT('long')},
      h_images: { type:Sequelize.TEXT('long')},
      v_images: { type:Sequelize.TEXT('long')},
      address: { type:Sequelize.TEXT},
      address1: { type:Sequelize.TEXT},
      city: { type:Sequelize.STRING(50)},
      state: { type:Sequelize.STRING(50)},
      country: { type:Sequelize.STRING(50)},
      pin: { type:Sequelize.STRING(50)},
      lat: { type:Sequelize.STRING(15)},
      long: { type:Sequelize.STRING(15)},
      other_review: {type:Sequelize.ENUM('0','1'),defaultValue:'0'},
      part_activity: {type:Sequelize.ENUM('0','1')},
      other_website: {type:Sequelize.TEXT('long')},
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
    await queryInterface.dropTable('activity_others');
  }
};