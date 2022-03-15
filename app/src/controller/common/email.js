const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../../config.json')[env];
const nodemailer = require('nodemailer');
const controller = {};
let transporter = nodemailer.createTransport({
    service: config.mailService,
    auth: {
        user: config.mailUser,
        pass: config.mailPass
    }
});
controller.email_send = async (to, from, subject, mesg, callback) => {
    let mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: mesg
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('>>>>>>>',error);
            callback(false);
        } else {
            console.log('Email sent: ' + info.response);
            callback(true);
        }
    });
}
module.exports = controller;