'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_activity.init({
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    parent: {
      type: DataTypes.INTEGER(11)
    },
  }, {
    sequelize,
    modelName: 'User_activity',
  });
  return User_activity;
};