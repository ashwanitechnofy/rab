'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class third_party_booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  third_party_booking.init({
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
   mobile: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    payment_status: {
      type: DataTypes.ENUM('0','1'),
      defaultValue:'0'
    },
  }, {
    sequelize,
    modelName: 'third_party_booking',
  });
  return third_party_booking;
};