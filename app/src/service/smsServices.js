const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../config.json')[env];
const client = require('twilio')(config.TwilioAccountSid, config.TwilioAuthToken);
const control = {};
 control.SendSingleSms = (to, body) => {
 	const from = config.TwilioFrom;
    const rest = client.messages.create({ body, from, to });
    console.log(rest);
        return rest;
};
module.exports =control;