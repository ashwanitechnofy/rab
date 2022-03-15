const {sequelize,DataTypes} = require('../index');
const Other = require('../model/other_details')(sequelize, DataTypes);

class OtherService {

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
module.exports = OtherService;