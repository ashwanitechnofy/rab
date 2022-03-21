var multer = require('multer');
let files = {};
var storageK = multer.diskStorage({
	destination: function (req, file, callback) {
		if(file.fieldname == 'identity')
		callback(null, 'public/uploadImages/kyc');

		if(file.fieldname == 'image')
		callback(null, 'public/uploadImages/profile');

		if(file.fieldname == 'visiting_card_image')
		callback(null, 'public/uploadImages/visitingCard');

		if(file.fieldname == 'award_certification_image')
		callback(null, 'public/uploadImages/awardCertification');
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
		name: 'image',
		maxCount:1
	},
	{
		name: 'visiting_card_image',
		maxCount:1
	},
	{
		name: 'award_certification_image',
		maxCount:1
	},
]);

module.exports = files;