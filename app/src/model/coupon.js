'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  coupon.init({
    type: {
      type: DataTypes.ENUM('Percentage','Fixed Amount'),
      defaultValue:'Fixed Amount'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull:false,
      unique:true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    from: {
      type: DataTypes.DATE,
      allowNull:false
    },
    to: {
      type: DataTypes.DATE,
      allowNull:false
    },
    upTo_value: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM('1','0'),
      defaultValue:'1'
    },
  }, {
    sequelize,
    modelName: 'coupon',
  });
  return coupon;
};