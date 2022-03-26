var bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../../config.json')[env];
const emailSend = require('../common/email');

const {sequelize,DataTypes} = require('../../index');
const Kyc = require('../../model/kyc')(sequelize, DataTypes);
const BankDetails = require('../../model/bank_details')(sequelize, DataTypes);

const RoleService = require("../../service/role");
const UserService = require("../../service/user");
const KYCService = require("../../service/kyc");
const otherService = require("../../service/otherDetails");
const UserActivityService = require("../../service/userActivity");
const BankService = require("../../service/bank");

var moment = require('moment');

const Role = new RoleService();
const User = new UserService();
const KYC = new KYCService();
const Other =new otherService();
const UserAct = new UserActivityService();
const Bank = new BankService();

const controller = {};

/**
 * @params:      Request
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To authenticate Vendor
*/
controller.login = async (req, res) => {
    try {
        var vendorRoleId = await Role.getIdByRoleName('Vendor');
        const { email, password } = req.body;
        var vendor = await User.getUserOne({ email: email, role_id: vendorRoleId });
        if (vendor && Object.keys(vendor).length) {
            const getUp = await User.getUserOne({email, status: '1'});
            if (getUp && Object.keys(getUp).length) {
                const match = await bcrypt.compare(password, getUp.password);
                if (match) {
                    const token = await jwt.sign({authUser: getUp}, config.SECRET);
                    return res.status(200).json({
                        status: 200,
                        data: {
                            token,
                            id: getUp.id,
                            first_name: getUp.first_name,
                            last_name: getUp.last_name,
                            role_id: getUp.role_id,
                            email: getUp.email,
                            mobile_no: getUp.mobile_no,
                            gender: getUp.gender,
                            dob: getUp.dob,
                            country: getUp.country,
                            state: getUp.state,
                            city: getUp.city,
                            address: getUp.address,
                            pin_code: getUp.country,
                            landmark: getUp.landmark,
                            image: getUp.image,
                            is_approved: getUp.is_approved,
                        },
                        message: 'Login successfully.',
                        error: null,
                    });
                } else {
                    return res.status(400).json({
                        status: 400,
                        data: null,
                        message: 'Email and password do not match.',
                        error: true,
                    });
                }
            } else {
                return res.status(400).json({
                    status: 400,
                    data: null,
                    message: 'Account not activated.',
                    error: true,
                })
            }
        } else {
            return res.status(400).json({
                status: 400,
                data: null,
                message: 'Email do not exist in our records.',
                error: true,
            })
        }
    } catch (err) {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        })
    }
}

/**
 * @params:      Request
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To register Vendor
*/
controller.register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password, salt);
        var roleId = await Role.getIdByRoleName('Vendor');
        req.body.role_id = roleId;
        if (req.files && Object.keys(req.files).length) {
            if (req.files.image && Object.keys(req.files.image).length) {
                req.body.image = req.files.image[0].filename;
            }
            if (req.files.visiting_card_image && Object.keys(req.files.visiting_card_image).length) {
                req.body.visiting_card_image = req.files.visiting_card_image[0].filename;
            }
            if (req.files.award_certification_image && Object.keys(req.files.award_certification_image).length) {
                req.body.award_certification_image = req.files.award_certification_image[0].filename;
            }
        }
        req.body.dob = moment(req.body.dob,'DD-MM-YYYY').format('YYYY-MM-DD');
        const signUp = await User.register(req.body);
        if (signUp){
            req.body.user_id = signUp.id;
            await User.registerVendorBusinessDetail(req.body);
            return res.status(200).json({
                status: 200,
                data: null,
                message: 'Vendor signup successfully.',
                error: null,
            });
        } else{
            return res.status(500).json({
                status: 500,
                data: null,
                message: 'Internal server error.',
                errors: signUp.errors
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        });
    }
}

/**
 * @params:      Request
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To Vendor KYC
*/
controller.kyc = async (req, res) => {
    try {
        req.body.user_id = req.decoded_data.id;
        if (req.files && Object.keys(req.files).length) {
            if (req.files.identity && Object.keys(req.files.identity).length) {
                req.body.identity = req.files.identity[0].filename;
            }
        }
        await Kyc.create(req.body).then(data => {
            return res.status(200).json({
                status: 200,
                data: null,
                message: 'KYC successfully.',
                error: null,
            });
        }).catch(err => {
            return res.status(500).json({
                status: 500,
                data: null,
                message: 'Internal server error.',
                errors: signUp.errors
            });
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        });
    }
}

/**
 * @params:      Request
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To Vendor Bank details
*/
controller.bank_details = async (req, res) => {
    try {
        req.body.user_id = req.decoded_data.id;
        await BankDetails.create(req.body).then(data => {
            return res.status(200).json({
                status: 200,
                data: null,
                message: 'Bank Details successfully.',
                error: null,
            });
        }).catch(err => {
            return res.status(500).json({
                status: 500,
                data: null,
                message: 'Internal server error.',
                errors: signUp.errors
            });
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Somthing went wrong.',
            error: err,
        });
    }
}

/**
 * @params:      Request
 * @createdDate: MARCH-2022 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To forgot password vendor
*/
controller.forgot = async (req, res) => {
    try{
        var roleId = await Role.getIdByRoleName('Vendor');
        let email = req.body.email;
        if(email){
        const service = await User.getUserOne({email:email,role_id:roleId,status:'1'});
        if(!service){
            return res.status(200).json({
                status: 200,
                data: null,
                message: 'No User Found.',
                error: null,
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
                    status: 200,
                    data: null,
                    message: 'Please check your email to reset the password.',
                    error: null,
                });
            }else{
                return res.status(500).json({
                    status: 500,
                    data: null,
                    message: 'Mail not send.',
                    error: null,
                })
            } 
            });
            }
            }else{
                return res.status(500).json({
                    status: 500,
                    data: null,
                    message: 'Email field not found.',
                    error: null,
                })
            }      
        } catch (err) {
        return res.status(500).json({
            status: 500,
            data: null,
            message: 'Internal Server Error.',
            error: err,
        });
    }  
}

// controller.forget = async (req, res) => {
//     try{
//     var roleId = await Role.getIdByRoleName('Vendor');
//     let email = req.body.email;
//     if(email){
//     const service = await User.getUserOne({email:email,role_id:roleId,status:'1'});
//     if(!service){
//         return res.status(200).json({
//             success: false,
//             error: true,
//             message: 'No User Found!'
//         });
//         }else{
//             const token = await jwt.sign({
//                 email: service.email,
//             }, config.SECRET, { expiresIn: '1h' });
//            var  adminData = await User.getAdminEmail();
//             var mesg = 'Hii<br/> Click the link for reset password <a href="' + config.BASE_URL + 'reset/'+token+'">'+ config.BASE_URL + 'reset/'+token+'</a><br/>Thank you!';
//             await emailSend.email_send(service.email, adminData.first_name +' '+adminData.last_name + '<' + adminData.email + '>', 'Reset Password', mesg,  async function (response) {
//          if(response){
//             await User.update({reset_token:token},{email:service.email});
//             return res.status(200).json({
//                 success: true,
//                 error: false,
//                 message: 'Please check your email to reset the password.'
//             });
//         }else{
//             return res.status(500).json({
//                 success: false,
//                 error: true,
//                 message: 'Mail not send!'
//             })
//         } 
//         });
//         }
//         }else{
//             return res.status(500).json({
//                 success: false,
//                 error: true,
//                 message: 'Email field not found!'
//             })
//         }      
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             data: null,
//             error: true,
//             message: 'Internal Server Error'
//         })
//     }  
// }

module.exports = controller;