const {sequelize,DataTypes} = require('../index');
const Activity = require('../model/user_activity')(sequelize, DataTypes);

class UserActivityService {

    register(body) {
        return new Promise((resolve, reject) => {
            return Activity.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }
    
}
module.exports = UserActivityService;