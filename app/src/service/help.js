const {sequelize,DataTypes} = require('../index');
const Help = require('../model/help')(sequelize, DataTypes);

class HelpService {
    register(body) {
        return new Promise((resolve, reject) => {
            return Help.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }
}
module.exports = HelpService;