const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
	animalName: {
		type: String,
		required: true,
	},
	testName: {
		type: String,
		required: true,
	},
	refTable: [
		{
			parameter: {
				type: String,
				required: true,
			},
			unit: {
				type: String,
				required: true,
			},
			referenceRange: {
				type: String,
				required: true,
			},
		},
	],
	animalId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Animal',
		required: true,
	},
	testId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Test',
		required: true,
	},
});

module.exports = mongoose.model('Reference', referenceSchema);
