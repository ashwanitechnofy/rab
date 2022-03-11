const {sequelize,DataTypes} = require('../index');
const Kyc = require('../model/kyc')(sequelize, DataTypes);

class KYCService {
    register(body) {
        return new Promise((resolve, reject) => {
            return Kyc.create(body)
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });

        });
    }
}
module.exports = KYCService;