const {sequelize,DataTypes} = require('../index');
const Users = require('../model/users')(sequelize, DataTypes);

class UserService {

    register(body) {
        return new Promise((resolve, reject) => {
            return Users.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }

    getAdminEmail(param) {
        return new Promise((resolve, reject) => {
            Users.findOne({
                where: {role_id:'1',status:'1'},
                attributes:['first_name','last_name','email']
            }).then(u => {
                return resolve(u);
            }).catch(err => {
                console.log('err>>>>>>', err);
                return reject(err);
            });
        });
    }

    /**
     * @params:      
     * @purpose: To get single user
    */
    getUserOne(param) {
        return new Promise((resolve, reject) => {
            Users.findOne({
                where: param
            }).then(u => {
                return resolve(u);
            }).catch(err => {
                console.log('err>>>>>>', err);
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
                console.log('err>>>>>>', err);
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
                console.log('err>>>>>>', err);
                return reject(err);
            });
        });
    }

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
     * @purpose: To update single user
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
     * @purpose: To update (status) single user
    */
    updateStatus() {
        return Users.update(body, {
            returning: true,
            where: condition
        }).then(u => {
            return true;
        })
    }

    /**
     * @params:      
     * @purpose: To delete single user
    */
    deleteUser(id) {
        return new Promise((resolve, reject) => {
            return Users.destroy({
                where: { id: id }
            }).then(async u => {
                if (u) {
                    // await ActivityListDate.destroy({ where: { activity_id: id } });
                    // await ActivityAddOns.destroy({ where: { activity_id: id } });
                    // await Comments.destroy({ where: { activity_id: id } });
                    // await ActivityOther.destroy({ where: { activity_id: id } });
                }
                return resolve(u);
            }).catch(err => {
                return reject(err);
            });
        });
    }
    
}
module.exports = UserService;