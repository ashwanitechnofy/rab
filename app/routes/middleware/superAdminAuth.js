const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];

const RoleService = require("../../src/service/role");
const UserService = require("../../src/service/user");

const Role = new RoleService();
const User = new UserService();

module.exports = async(req, res, next) => {
    try {
        if (req.session.data.token) {
            var roleId = await Role.getIdByRoleName('Super Admin');
            var isUser = await User.checkUserExist({ id:req.session.data.id, email:req.session.data.email, role_id:roleId, status:'1' });
            if(isUser){
                jwt.verify(req.session.data.token, config.SECRET, (err, verify) => {
                    if(!err){
                        req.decoded_data = verify.user;
                        next();
                    } else{
                        console.log('middleware   1');
                        res.redirect('/admin/login');
                    }
                });
            } else{
                console.log('middleware   2');
                res.redirect('/admin/login');
            }
        } else{
            console.log('middleware   3');
            res.redirect('/admin/login');
        }
    } catch (error){
        console.log('middleware   4');
        res.redirect('/admin/login');
    }
}
