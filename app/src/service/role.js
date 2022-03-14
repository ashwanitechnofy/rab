const {sequelize,DataTypes} = require('../index');
const Role = require('../model/role')(sequelize, DataTypes);
const Users = require('../model/users')(sequelize, DataTypes);

const UserOne = Role.hasOne(Users, {
    foreignKey: 'role_id'
});

class RoleService {
    getIdByRoleName(name) {
        return new Promise((resolve, reject) => {
            Role.findOne({
                attributes:['id'],
                where: {name: name}
            }).then(res => {
                return resolve(res.id);
            }).catch(err => {
                return reject(err);
            });
        });
    }
}

module.exports = RoleService;