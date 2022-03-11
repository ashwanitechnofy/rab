'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class other_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  other_details.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    adventure_level: {
      type: DataTypes.INTEGER(5)
     },
     activity_diff: {
      type: DataTypes.STRING(15)
     },
    visiting_card: {
      type: DataTypes.ENUM('0','1'), 
      defaultValue: "0"
    },
    visiting_image: {
      type: DataTypes.STRING(200)
    },
    certificate: {
      type: DataTypes.STRING(200)
    },
    description: {
      type: DataTypes.TEXT('long'),
    }
  }, {
    sequelize,
    modelName: 'other_details',
  });
  return other_details;
};