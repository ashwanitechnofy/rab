var { login, register, kyc, forget } = require('../src/controller/vendor/index')
var { vehicle_add,categoryList,getList,vehicle_view,vehicle_edit,vehicle_delete,add_comment } = require('../src/controller/vendor/vehicle')
var {booking_create,change_booking_status,check_avail_vehicle,check_coupon,check_vehicle_booking} = require('../src/controller/vendor/booking');
var { activity_add,activity_edit,activity_delete,getAList,activity_view,add_activity_comment,change_activity_status } = require('../src/controller/vendor/activity')

var { add_help } = require('../src/controller/vendor/help')

var { Upload } = require('./common/files/upload')
var { Vehicle } = require('./common/files/vehicle');
var { Activity_upload } = require('./common/files/activity');

var { VENDOR_LogIN } = require('../src/service/Validation');

var Auth = require('./middleware/auth');
var vendorAuth = require('./middleware/vendorAuth');
// var auth = require('./middleware/vendorAuth');

module.exports = (app) => {
	app.post('/api/v1/vendor/login', login);
	app.post('/api/v1/vendor/signup', Upload, register);
	app.post('/api/v1/vendor/kyc', Auth, vendorAuth, Upload, kyc);
	app.post('/api/v1/vendor/forget', forget);

	//vehicle
	app.get('/api/v1/vendor/vehicle/categoryAllList', Auth, vendorAuth, categoryList);
	app.get(['/api/v1/vendor/vehicle/list?category_id={category_id}&id={id}','/api/v1/vendor/vehicle/list?category_id={category_id}','/api/v1/vendor/vehicle/list'], Auth, vendorAuth, getList);
	app.post('/api/v1/vendor/vehicle/add',Auth, vendorAuth, Vehicle, vehicle_add);
	app.get('/api/v1/vendor/vehicle/view/:id', Auth, vendorAuth, vehicle_view);
	app.put('/api/v1/vendor/vehicle/edit/:id', Auth, vendorAuth, Vehicle, vehicle_edit);
	app.delete('/api/v1/vendor/vehicle/delete/:id', Auth, vendorAuth, Vehicle, vehicle_delete);
	app.post('/api/v1/vendor/vehicle/comment', Auth, vendorAuth, add_comment);

    //booking
	app.post('/api/v1/vendor/booking/check_availability_vehicle', Auth, vendorAuth, check_avail_vehicle);
	app.post('/api/v1/vendor/booking/check_availability_vehicle', Auth, vendorAuth, check_avail_vehicle);
	app.post('/api/v1/vendor/booking/add', Auth, vendorAuth, booking_create);
	app.put('/api/v1/vendor/booking/booking_status/:id', Auth, vendorAuth, change_booking_status);
	app.get('/api/v1/vendor/booking/check_coupon/:coupon', Auth, vendorAuth, check_coupon);
	app.post('/api/v1/vendor/booking/check_vehicle_booking', Auth, vendorAuth, check_vehicle_booking);

	app.post('/api/v1/vendor/activity/add', Auth, vendorAuth, Activity_upload, activity_add);
	app.put('/api/v1/vendor/activity/edit/:id', Auth, vendorAuth, Activity_upload, activity_edit);
	app.delete('/api/v1/vendor/activity/delete/:id', Auth, vendorAuth, activity_delete);
	
	app.post('/api/v1/vendor/activity/comment', Auth, vendorAuth, add_activity_comment);
	app.get(['/api/v1/vendor/activity/list?category_id={category_id}&id={id}','/api/v1/vendor/activity/list?category_id={category_id}','/api/v1/vendor/activity/list'], Auth, vendorAuth, getAList);
	app.get('/api/v1/vendor/activity/view/:id', Auth, vendorAuth, activity_view);
	app.put('/api/v1/vendor/activity/change_status/:id', Auth, vendorAuth, change_activity_status);

	app.post('/api/v1/vendor/help/add', Auth, vendorAuth, add_help);
}