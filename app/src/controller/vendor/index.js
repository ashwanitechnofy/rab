const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../../config.json')[env];
const jwt = require("jsonwebtoken");
const emailSend = require('../common/email');
const UserService = require("../../service/user");
const otherService = require("../../service/otherDetails");
const UserActivityService = require("../../service/userActivity");
const KYCService = require("../../service/kyc");
const RoleService = require("../../service/role");
const BankService = require("../../service/bank");

var bcrypt = require('bcrypt');

const User = new UserService();
const Role = new RoleService();
const Other =new otherService();
const UserAct = new UserActivityService();
const KYC = new KYCService();
const Bank = new BankService();

const controller = {};

controller.register = async (req, res) => {
    try {
        if(req.body.email && req.body.mobile_no){
        var user = await User.checkUserExist({$or: [{email:req.body.email},{mobile_no:req.body.mobile_no}]});
        if (user && Object.keys(user).length) {
            return res.status(200).json({
                success: false,
                error: true,
                message: 'User already exists.'
            });
        } else {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            var roleId = await Role.getIdByRoleName('Vendor');
            req.body.role_id = roleId;
            if (req.files && Object.keys(req.files).length) {
                if (req.files.visiting_image && Object.keys(req.files.visiting_image).length) {
                  req.body.visiting_image = req.files.visiting_image[0].filename;
                }
                if (req.files.identity && Object.keys(req.files.identity).length) {
                    req.body.identity = req.files.identity[0].filename;
                  }
                if (req.files.certificate && Object.keys(req.files.certificate).length) {
                  req.body.certificate = req.files.certificate[0].filename;
                }
                if (req.files.photo && Object.keys(req.files.photo).length) {
                  req.body.photo = req.files.photo[0].filename;
                }
            }
            const signup = await User.register(req.body);
            if (signup) {
                req.body.user_id = signup.id;
                 await Other.register(req.body);
                 await UserAct.register(req.body);
                 await KYC.register(req.body);
                 await Bank.register(req.body);
                    return res.status(200).json({
                        success: true,
                        error: false,
                        message: 'User signup successfully'
                    });
                
            } else {
                return res.status(200).json({
                    success: false,
                    error: true,
                    message: 'Something went wrong!'
                });
            }

        }
    } else {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Email and mobile number not found!'
        });
    } 
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error'
        });
    }
}


controller.login = async (req, res) => {
    var roleId = await Role.getIdByRoleName('Vendor');
    try {
        const {
            email,
            password
        } = req.body;
        var user = await User.getUserOne({
            email: email,
            role_id: roleId
        });
            if (user && Object.keys(user).length) {
                const getUp = await User.getUserOne({
                    email,
                    status: '1'
                });
                if (getUp && Object.keys(getUp).length) {
                    const match = await bcrypt.compare(password, getUp.password);
                    if (match) {
                        const token = await jwt.sign({
                            email: getUp.email
                        }, config.SECRET);
                        return res.status(200).json({
                            success: true,
                            error: false,
                            data: {
                                id:getUp.id,
                                token,
                                email:getUp.email,
                                first_name:getUp.first_name,
                                role_id:getUp.role_id,
                                photo:getUp.photo,
                                mobile_no:getUp.mobile_no,
                                lat:getUp.lat,
                                long:getUp.long
                            },
                            message: 'Login successfully!'
                        });
                    } else {
                        return res.status(200).json({
                            success: false,
                            error: true,
                            data: null,
                            message: 'Email and password do not match'
                        });
                    }

                } else {
                    return res.status(200).json({
                        success: false,
                        data: null,
                        error: true,
                        message: 'Account is not activated!'
                    })
                }
        } else {
            return res.status(500).json({
                success: false,
                data: null,
                error: true,
                message: 'Email not Found!.'
            })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            data: null,
            error: true,
            message: 'Internal Server Error'
        })
    }
}


controller.forget = async (req, res) => {
    try{
    var roleId = await Role.getIdByRoleName('Vendor');
    let email = req.body.email;
    if(email){
    const service = await User.getUserOne({email:email,role_id:roleId,status:'1'});
    if(!service){
        return res.status(200).json({
            success: false,
            error: true,
            message: 'No User Found!'
        });
        }else{
            const token = await jwt.sign({
                email: service.email,
            }, config.SECRET, { expiresIn: '1h' });
           var  adminData = await User.getAdminEmail();
            var mesg = 'Hii<br/> Click the link for reset password <a href="' + config.BASE_URL + 'reset/'+token+'">'+ config.BASE_URL + 'reset/'+token+'</a><br/>Thank you!';
            await emailSend.email_send(service.email, adminData.first_name +' '+adminData.last_name + '<' + adminData.email + '>', 'Reset Password', mesg,  async function (response) {
         if(response){
            await User.update({reset_token:token},{email:service.email});
            return res.status(200).json({
                success: true,
                error: false,
                message: 'Please check your email to reset the password.'
            });
        }else{
            return res.status(500).json({
                success: false,
                error: true,
                message: 'Mail not send!'
            })
        } 
        });
        }
        }else{
            return res.status(500).json({
                success: false,
                error: true,
                message: 'Email field not found!'
            })
        }      
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            data: null,
            error: true,
            message: 'Internal Server Error'
        })
    }  
}

module.exports = controller;