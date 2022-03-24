const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];

// const RoleService = require("../../src/service/role");
const UserService = require("../../src/service/user");

// const Role = new RoleService();
const User = new UserService();

module.exports = async(req, res, next) => {
    try {
        res.locals.toasts = req.toastr.render();
        if (req.session.data.token) {
            var isUser = await User.checkUserExist({ id:req.session.data.id, email:req.session.data.email, role_id:req.session.data.role_id, status:'1' });
            if(isUser){
                jwt.verify(req.session.data.token, config.SECRET, (err, verify) => {
                    if(!err){
                        req.decoded_data = verify.authUser;
                        next();
                    } else{
                        console.log('admin middleware   1');
                        res.redirect('/admin/login');
                    }
                });
            } else{
                console.log('admin middleware   2');
                res.redirect('/admin/login');
            }
        } else{
            console.log('admin middleware   3');
            res.redirect('/admin/login');
        }
    } catch (error){
        console.log('admin middleware   4');
        res.redirect('/admin/login');
    }
}