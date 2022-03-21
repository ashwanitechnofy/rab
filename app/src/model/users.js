'use strict';
const {
  Model
} = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      /* Users.hasMany(models.user_activity, {
         foreignKey: 'user_id',
         as: 'user_activity'
       });*/
    }
  }
  Users.init({
    first_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(20)
    },
    role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      email: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    mobile_no: {
      type: DataTypes.INTEGER(20),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    pin_code: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    landmark: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(191),
      get() {
        if (this.getDataValue('image')) {
          return config.BASE_URL + 'uploadImages/profile/' + this.getDataValue('image');
        }
      },
    },
    is_approved: {
      type: DataTypes.ENUM('0', '1'),
      defaultValue: "0",
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('0', '1'),
      defaultValue: "0",
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'users',
  });
  return Users;
};