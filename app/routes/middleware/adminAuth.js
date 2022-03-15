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
            var roleId = await Role.getIdByRoleName('Admin');
            var isUser = await User.checkUserExist({ id:req.session.data.id, email:req.session.data.email, role_id:roleId, status:'1' });
            if(isUser){
                jwt.verify(req.session.data.token, config.SECRET, (err, verify) => {
                    if(!err){
                        req.decoded_data = verify.user;
                        next();
                    } else{
                        res.redirect('/admin/login');
                    }
                });
            } else{
                res.redirect('/admin/login');
            }
        } else{
            res.redirect('/admin/login');
        }
    } catch (error){
        res.redirect('/admin/login');
    }
}