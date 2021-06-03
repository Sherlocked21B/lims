const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
	result: [
		// {
		// 	parameters: {
		// 		type: String,
		// 		required: true,
		// 	},
		// 	units: {
		// 		type: String,
		// 		required: true,
		// 	},
		// 	value: {
		// 		type: String,
		// 		required: true,
		// 	},
		// 	referenceRange: {
		// 		type: String,
		// 		required: true,
		// 	},
		// 	remarks: {
		// 		type: String,
		// 		default: "",
		// 	},
		// },
	],
	sampleId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Sample',
		required: true,
	},
	Remarks: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Result', resultSchema);
