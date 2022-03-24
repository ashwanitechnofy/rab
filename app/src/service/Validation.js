
var bcrypt = require('bcrypt');
const Sequelize = require("sequelize");
const { check  } = require('express-validator/check');
const env = process.env.NODE_ENV || 'development';
const development = require(__dirname + '../../../../config.json')[env];

const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

const DataTypes = Sequelize.DataTypes;
var sequelize = new Sequelize(development.database, development.username, development.password, {
    host: development.host,
    dialect: development.dialect,
    operatorsAliases: operatorsAliases,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

    // SQLite only
    //storage: 'path/to/database.sqlite'
});

const UserService = require('../service/user');
const User = new UserService();

 const validation = {

    VENDOR_LogIN: [
       check('email').isEmail().withMessage('Email address must be Valid').custom(value => {
            if (!value) {
                return Promise.reject('Email is required');
            }
        }),
        check('password').custom((password, {
            req
        }) => {
            return User.getUserOne({
                        email: req.body.email,
                        status:'1',
                        role_id:1
                })
                .then(async u => await bcrypt.compare(password, u.password))
        }).withMessage('Email and Password are wrong.')
    ]
}
   
   module.exports = validation;