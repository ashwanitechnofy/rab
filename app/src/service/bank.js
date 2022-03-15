const {sequelize,DataTypes} = require('../index');
const Bank = require('../model/bank_details')(sequelize, DataTypes);

class BankService {
    register(body) {
        return new Promise((resolve, reject) => {
            return Bank.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }
}
module.exports = BankService;