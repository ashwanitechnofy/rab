const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../../config.json')[env];
const HelpService = require("../../service/help");
const UserService = require("../../service/user");
const emailSend = require('../common/email');

const Help = new HelpService();
const User = new UserService();

const controller = {};

controller.add_help = async (req, res) => {
    try {
        if(req.body.email && req.body.message){
            const signup = await Help.register(req.body);
            if (signup) {
                var  adminData = await User.getAdminEmail();
                var mesg = '';
                var mesg = 'Thank you for messaging us will check your query and response.';
                await emailSend.email_send(req.body.email, '<' + adminData.email + '>', 'Query instead response', mesg);

                    return res.status(200).json({
                        success: true,
                        error: false,
                        message: 'Successfuly added!'
                    });
            } else {
                return res.status(500).json({
                    success: false,
                    error: true,
                    message: 'Something went wrong!'
                });
            }
        } else {
            return res.status(200).json({
                success: false,
                error: true,
                message: 'Email or message not found!'
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

module.exports = controller;