var multer = require('multer');
let files = {};
var storageK = multer.diskStorage({
	destination: function (req, file, callback) {
		console.log(file);
		if(file.fieldname == 'identity')
		callback(null, 'app/assets/image/kyc');

		if(file.fieldname == 'photo')
		callback(null, 'app/assets/image/profile');

		if(file.fieldname == 'visiting_image')
		callback(null, 'app/assets/image/cards');

		if(file.fieldname == 'certificate')
		callback(null, 'app/assets/image/certificates');
	},
	filename: function (req, file, callback) {
		callback(null, Date.now() + "_" + file.originalname);
	}
});
var kUpload = multer({
	storage: storageK
})
files.Upload = kUpload.fields([{
	name: 'identity',
	maxCount:1
},
{
	name: 'certificate',
	maxCount:1
},
{
	name: 'photo',
	maxCount:1
},
{
	name: 'visiting_image',
	maxCount:1
}]);

module.exports = files;