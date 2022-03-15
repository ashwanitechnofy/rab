const {sequelize,DataTypes} = require('../index');
const Other = require('../model/activity_other')(sequelize, DataTypes);

class ActivityOtherService {

    register(body) {
        return new Promise((resolve, reject) => {
            return Other.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }

    getOne(param) {
        return new Promise((resolve, reject) => {
            return Other.findOne({where:param})
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });
        });
    }  

    update(body, condition) {
        return Other.update(body, {
            returning: true,
            where: condition
        }).then(u => {
            return true;
        })
    }

    checkUserExistence(param) {
        return new Promise((resolve, reject) => {
            Other.findOne({
                attributes:['id'],
                where: param
            }).then(user => {
                return resolve(user);
            }).catch(err => {
                return reject(err);
            });
        });
    }
    
}
module.exports = ActivityOtherService;