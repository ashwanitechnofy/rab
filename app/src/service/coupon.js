const {sequelize,DataTypes} = require('../index');
const Coupon = require('../model/coupon')(sequelize, DataTypes);

class CouponService {
    getByCoupon(coupon) {
        return new Promise((resolve, reject) => {
            const today = new Date();
            return Coupon.findOne({where:{status:'1',name:coupon,from:{$lte:new Date()},to:{$gte:new Date()}} })
                .then(u => {
                    return resolve(u);
                }).catch(err => {
                    console.log('err>>>>>>>>>>', err);
                    return reject(err);
                });
        });
    }
}
module.exports = CouponService;