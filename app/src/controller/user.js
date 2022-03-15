const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const sms = require("../service/smsServices");
const UserService = require("../service/user");


const User = new UserService();
const controller = {};

controller.getEmailNotExist = async (req, res) => {
    let email = req.body.email;
    if (email) {
        const service = await User.checkUserExist({ email: email });
        if (!service) {
            return res.status(200).json({
                success: true,
                error: false,
                message: 'No user found!'
            });
        } else {
            return res.status(200).json({
                success: false,
                error: true,
                message: 'User already exists!'
            });
        }
    } else {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Email field not found!'
        })
    }
}

controller.sendOTPMobile = async (req, res) => {
    let mobile_no = req.body.mobile_no;
    if (mobile_no) {
        const service = await User.checkUserExist({ mobile_no: mobile_no });
        if (!service) {
            let otp = Math.floor(1000 + Math.random() * 9000);
            const msg = `<#> The Mobile veification code is: ${otp} from RAB. Only valid for 10 Minutes`
            await sms.SendSingleSms(`+91${mobile_no}`, msg);
            console.log('otp>>', otp);
            const token = await jwt.sign({
                data: { mobile_no, otp },
                exp: Math.floor(new Date().getTime() + 10 * 60000)
            }, config.SECRET);
            return res.status(200).json({
                success: true,
                error: false,
                data: { token },
                message: 'Please verify your number.'
            });
        } else {
            return res.status(200).json({
                success: false,
                error: true,
                message: 'User already exists!'
            });
        }
    } else {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Mobile_no field not found!'
        })
    }
}

controller.verifyOTPMobile = async (req, res) => {
    const { token, otp } = req.body;
    try {
        if (token) {
            const decoded = jwt.verify(token, config.SECRET)
            if (otp == decoded.data.otp) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    message: 'Token successfully matched!'
                });
            } else {
                return res.status(500).json({
                    success: false,
                    error: true,
                    message: 'Otp is wrong!'
                });
            }
        } else {
            return res.status(401).json({
                success: false,
                error: true,
                message: 'Token not found!'
            });
        }
    } catch (error) {
        console.log('>>>>>>>>>', error);
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Token has been expired!'
        });
    }
}
/*
controller.reset_link = async (req, res) => {
 const {token} = req.body;
 let email = await verifyCustomToken(token);
  if(email){
     let user = await User.checkUserExist({reset_token:token,email:email});
     if(user){
    return res.status(200).json({
        success: true,
        error: false,
        data:{email:email},
        message: 'Token is valid!'
    });
}else{
    return res.status(500).json({
        success: false,
        error: true,
        message: 'Token has been expired!'
    });
 }
 }else{
    return res.status(500).json({
        success: false,
        error: true,
        message: 'Token has been expired!'
    });
 }
}

controller.reset = async (req, res) => {
    try {
        const {
            email,
            password,
            token,
        } = req.body;
        
        if (email && password && token) {
            let check = await verifyCustomToken(token);
            let user = await User.getUserOne({reset_token:token,email:email, status: '1'});
            if(check && user){ 
               const salt = await bcrypt.genSalt();
                    req.body.password = await bcrypt.hash(password, salt);

                    user = await User.update({
                        password: req.body.password,
                        reset_token:null
                    }, {
                        email: email
                    });
                    if (user) {
                        return res.status(200).json({
                            success: true,
                            error: false,
                            message: 'User successfully updated password!'
                        });
                    } else {
                        return res.status(500).json({
                            success: false,
                            error: true,
                            message: 'Something went wrong!'
                        });
                    }
        } else {
            return res.status(500).json({
                success: false,
                error: true,
                message: 'Time out!'
            });
        }
        } else {
            return res.status(500).json({
                success: false,
                error: true,
                message: 'Fields are mendatory!'
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

***********COMMON**************
verifyCustomToken = async (token) => {
    try {
const decoded = jwt.verify(token, config.SECRET)
return decoded.email;
} catch (error) {
    console.log('>>>>>>>>>',error);
    return false;
}
}
*******************************/
module.exports = controller;