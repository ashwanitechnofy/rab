var { getEmailNotExist,sendOTPMobile,verifyOTPMobile } = require('../src/controller/user');
//const config = require(__dirname + '/../../config.json')[env];

module.exports = (app) => {
	app.post('/api/v1/user/getEmailNotExist',getEmailNotExist);
    app.post('/api/v1/user/sendOTPMobile',sendOTPMobile);
    app.post('/api/v1/user/verifyOTPMobile',verifyOTPMobile);
 //   app.post('/api/v1/user/verify_reset_link',reset_link);
  //  app.post('/api/v1/user/reset_password',reset);

}