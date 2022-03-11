var multer = require('multer');
let files = {};
var storageK = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, 'app/assets/image/activity');
	},
	filename: function (req, file, callback) {
		callback(null, Date.now() + "_" + file.originalname);
	}
});
var kUpload = multer({
	storage: storageK
})
files.Activity_upload = kUpload.fields([{
	name: 'h_images',
	maxCount:5
},
{
	name: 'v_images',
	maxCount:5
}
]);

module.exports = files;