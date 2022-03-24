const {sequelize,DataTypes} = require('../index');
const Users = require('../model/users')(sequelize, DataTypes);
const vendorBusinessDetails = require('../model/vendor_business_details')(sequelize, DataTypes);

Users.hasOne(vendorBusinessDetails, {
    foreignKey: 'user_id'
});

class UserService {

    /**
     * @params:      
     * @purpose: To add user
    */
    register(body) {
        return new Promise((resolve, reject) => {
            return Users.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    if(['SequelizeValidationError', 'SequelizeUniqueConstraintError'].includes(err.name)){
                        return resolve({error:true, errors: err.errors.map(v => {return {[v.path]:v.message}})})
                    }
                    return reject(err);
                });
        });
    }

    /**
     * @params:      
     * @purpose: To add vendor business detail
    */
    registerVendorBusinessDetail(body) {
        return new Promise((resolve, reject) => {
            return vendorBusinessDetails.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    return reject(err);
                });
        });
    }
    
    /**
     * @params:      
     * @purpose: To get admin email id
    */
    getAdminEmail(param) {
        return new Promise((resolve, reject) => {
            Users.findOne({
                where: {role_id:'1', status:'1'},
                attributes:['first_name','last_name','email']
            }).then(u => {
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To get user
    */
    getUserOne(param) {
        return new Promise((resolve, reject) => {
            Users.findOne({
                where: param
            }).then(u => {
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To get vendor
    */
     getVendorOne(param) {
        return new Promise((resolve, reject) => {
            Users.findOne({
                where: param,
                include:[{model:vendorBusinessDetails}]
            }).then(u => {
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To get all user
    */
    getUserAll(param) {
        return new Promise((resolve, reject) => {
            Users.findAll({
                where: param
            }).then(u => {
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    getUserSpecAttr(param,attributes) {
        return new Promise((resolve, reject) => {
            Users.findOne({
                where: param,
                attributes:[attributes]
            }).then(u => {
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To check user exist
    */
    checkUserExist(param) {
        return new Promise((resolve, reject) => {
            Users.findOne({
                attributes:['id'],
                where: param
            }).then(user => {
                return resolve(user);
            }).catch(err => {
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To update user
    */
    update(body, condition) {
        return Users.update(body, {
            returning: true,
            where: condition
        }).then(u => {
            return true;
        })
    }

    /**
     * @params:      
     * @purpose: To update vendor business detail
    */
     updateVendorBusinessDetail(body, condition) {
        return vendorBusinessDetails.update(body, {
            returning: true,
            where: condition
        }).then(u => {
            return true;
        })
    }

    /**
     * @params:      
     * @purpose: To delete user
    */
    deleteUser(id) {
        return new Promise((resolve, reject) => {
            return Users.destroy({
                where: { id: id }
            }).then(async u => {
                // await ActivityListDate.destroy({ where: { activity_id: id } });
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }
    
}
module.exports = UserService;