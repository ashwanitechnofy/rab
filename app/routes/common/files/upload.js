var multer = require('multer');
let files = {};
var storageK = multer.diskStorage({
	destination: function (req, file, callback) {
		if(file.fieldname == 'identity')
		callback(null, 'public/assets/upload/kyc');

		if(file.fieldname == 'image')
		callback(null, 'public/assets/upload/profile');

		if(file.fieldname == 'visiting_image')
		callback(null, 'public/assets/upload/cards');

		if(file.fieldname == 'certificate')
		callback(null, 'public/assets/upload/certificates');
	},
	filename: function (req, file, callback) {
		// callback(null, Date.now() + "_" + file.originalname);

		let fileName = file.originalname.split('.');
		let fileExtension = fileName[fileName.length-1];
		callback(null, Date.now() + '.' + fileExtension);
	}
});

var kUpload = multer({ storage: storageK })

files.Upload = kUpload.fields([
	{
		name: 'identity',
		maxCount:1
	},
	{
		name: 'certificate',
		maxCount:1
	},
	{
		name: 'image',
		maxCount:1
	},
	{
		name: 'visiting_image',
		maxCount:1
	}
]);

module.exports = files;