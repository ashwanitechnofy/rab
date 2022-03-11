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
      type: DataTypes.STRING(150),
      allowNull:false,
    },
    last_name: {
      type: DataTypes.STRING(150),
    },
    role_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      email:true
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(5),
    },
    mobile_no: {
    type: DataTypes.INTEGER(11),
   },
   alternate_mobile:{
    type: DataTypes.INTEGER(11),
  },
    age: {
      type: DataTypes.INTEGER(5),
    },
    lat: {
      type: DataTypes.DECIMAL(10,2)
    },
    long: {
      type: DataTypes.DECIMAL(10,2)
    },
    photo: {
      type: DataTypes.TEXT,
      get() {
        if(this.getDataValue('photo')){
          return config.BASE_URL+'/image/profile/'+this.getDataValue('photo');
    }
  },
    },
    address: {
      type: DataTypes.TEXT
     },
     address1: {
      type: DataTypes.TEXT
     },
     city: {
      type: DataTypes.STRING(50)
     },
     state: {
      type: DataTypes.STRING(50)
     },
     country: {
      type: DataTypes.STRING(50)
     },
     code: {
      type: DataTypes.STRING(50)
     },
     status: {
      type: DataTypes.ENUM('0','1'), 
      defaultValue: "0"
    },
     reset_token: {
      type: DataTypes.TEXT
     },
  }, {
    sequelize,
    modelName: 'users',
  });
  return Users;
};