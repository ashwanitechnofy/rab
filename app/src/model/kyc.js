'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kyc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  kyc.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull:false
    },
    kyc_address: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    identity: {
      type: DataTypes.TEXT,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'kyc',
  });
  return kyc;
};