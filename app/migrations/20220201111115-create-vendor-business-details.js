'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vendor_business_details', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      business_name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      aletrnate_mobile_no: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      location: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      gst_no: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(191),
        allowNull: false
      },
      is_visiting_card: {
        type: Sequelize.ENUM('0','1'), 
        defaultValue: "1",
        allowNull: false
      },
      visiting_card_image: {
        type: Sequelize.STRING(191)
      },
      award_certification_image: {
        type: Sequelize.STRING(191)
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
    await queryInterface.dropTable('vendor_business_details');
  }

};