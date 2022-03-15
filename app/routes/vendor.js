var { register,login,forget } = require('../src/controller/vendor/index')
var { vehicle_add,categoryList,getList,vehicle_view,vehicle_edit,vehicle_delete,add_comment } = require('../src/controller/vendor/vehicle')
var {booking_create,change_booking_status,check_avail_vehicle,check_coupon,check_vehicle_booking} = require('../src/controller/vendor/booking');
var { activity_add,activity_edit,activity_delete,getAList,activity_view,add_activity_comment,change_activity_status } = require('../src/controller/vendor/activity')

var { add_help } = require('../src/controller/vendor/help')

var { Upload } = require('./common/files/upload')
var { Vehicle } = require('./common/files/vehicle')
var { Activity_upload } = require('./common/files/activity')


var Auth = require('./middleware/auth')
var checkAuthorize = require('./middleware/vendorAuth')

module.exports = (app) => {
	app.post('/api/v1/vendor/signup',Upload, register);
	app.post('/api/v1/vendor/login',login);
	app.post('/api/v1/vendor/forget',forget);

	//vehicle
	app.get('/api/v1/vendor/vehicle/categoryAllList',Auth,checkAuthorize,categoryList);
	app.get(['/api/v1/vendor/vehicle/list?category_id={category_id}&id={id}','/api/v1/vendor/vehicle/list?category_id={category_id}','/api/v1/vendor/vehicle/list'],Auth,checkAuthorize,getList);
	app.post('/api/v1/vendor/vehicle/add',Auth,checkAuthorize,Vehicle,vehicle_add);
	app.get('/api/v1/vendor/vehicle/view/:id',Auth,checkAuthorize,vehicle_view);
	app.put('/api/v1/vendor/vehicle/edit/:id',Auth,checkAuthorize,Vehicle,vehicle_edit);
	app.delete('/api/v1/vendor/vehicle/delete/:id',Auth,checkAuthorize,Vehicle,vehicle_delete);
	app.post('/api/v1/vendor/vehicle/comment',Auth,checkAuthorize,add_comment);

    //booking
	app.post('/api/v1/vendor/booking/check_availability_vehicle',Auth,checkAuthorize,check_avail_vehicle);
	app.post('/api/v1/vendor/booking/check_availability_vehicle',Auth,checkAuthorize,check_avail_vehicle);
	app.post('/api/v1/vendor/booking/add',Auth,checkAuthorize,booking_create);
	app.put('/api/v1/vendor/booking/booking_status/:id',Auth,checkAuthorize,change_booking_status);
	app.get('/api/v1/vendor/booking/check_coupon/:coupon',Auth,checkAuthorize,check_coupon);
	app.post('/api/v1/vendor/booking/check_vehicle_booking',Auth,checkAuthorize,check_vehicle_booking);

	app.post('/api/v1/vendor/activity/add',Auth,checkAuthorize,Activity_upload,activity_add);
	app.put('/api/v1/vendor/activity/edit/:id',Auth,checkAuthorize,Activity_upload,activity_edit);
	app.delete('/api/v1/vendor/activity/delete/:id',Auth,checkAuthorize,activity_delete);
	
	app.post('/api/v1/vendor/activity/comment',Auth,checkAuthorize,add_activity_comment);
	app.get(['/api/v1/vendor/activity/list?category_id={category_id}&id={id}','/api/v1/vendor/activity/list?category_id={category_id}','/api/v1/vendor/activity/list'],Auth,checkAuthorize,getAList);
	app.get('/api/v1/vendor/activity/view/:id',Auth,checkAuthorize,activity_view);
	app.put('/api/v1/vendor/activity/change_status/:id',Auth,checkAuthorize,change_activity_status);

	app.post('/api/v1/vendor/help/add',Auth,checkAuthorize,add_help);
}