const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const RoleService = require("../../service/role");
const UserService = require("../../service/user");
// const bcrypt = require('bcrypt');

const Role = new RoleService();
const User = new UserService();

const controller = {};

/**
 * @params:      
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Super Admin / Admin login form
*/
controller.loginForm = async (req, res) => {
    return res.render('login', {key: 'login'});
}

/**
 * @params:      Request
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To authenticate Super Admin / Admin 
*/
controller.login = async (req, res) => {
    try {
        var roleId = await Role.getIdByRoleName('Admin');
        const { email, password } = req.body;
        var user = await User.getUserOne({ email: email, role_id: roleId });
        if (user && Object.keys(user).length){
            const getUp = await User.getUserOne({ email, status: '1' });
            if (getUp && Object.keys(getUp).length) {
                const match = await bcrypt.compare(password, getUp.password);
                if (match){
                    const token = await jwt.sign({ email: getUp.email }, config.SECRET);
                    req.session.data = { token: token, id: getUp.id, email: getUp.email, first_name: getUp.first_name, last_name: getUp.last_name, role_id: getUp.role_id, image: getUp.photo, mobile_no: getUp.mobile_no }
                    req.toastr.success("You are logged in successfully.");
                    res.redirect('/admin/dashboard');
                } else{
                    req.toastr.error("Email and password do not match.");
                    return res.redirect('back');
                }
            } else{
                req.toastr.error("Account not active.");
                return res.redirect('back');
            }
        } else{
            req.toastr.error("Email does not exist.");
            return res.redirect('back');
        }
    } catch (err){
        req.toastr.error("Somthing went wrong.");
        return res.redirect('back')
    }
}

module.exports = controller;