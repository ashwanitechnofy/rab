'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  booking.init({
    vehicle_id: { type:DataTypes.STRING, allowNull:false},
    user_id: { type:DataTypes.INTEGER, allowNull:false},
    quanity: { type:DataTypes.INTEGER, allowNull:false},
    from:  {type:DataTypes.DATEONLY, allowNull:false},
    to: {type:DataTypes.DATEONLY, allowNull:false},
    coupon_id: DataTypes.INTEGER,
    discount_price: DataTypes.INTEGER,
    discount_coupon: DataTypes.INTEGER,
    amount: {type:DataTypes.INTEGER,allowNull:false},
    grand_total: {type:DataTypes.INTEGER,allowNull:false
    },
    status: {
      type: DataTypes.ENUM('0','1','2'),
      defaultValue:'0'
    },
  }, {
    sequelize,
    modelName: 'booking',
  });
  return booking;
};