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
			parameters: {
				type: String,
				required: true,
			},
			units: {
				type: String,
				required: true,
			},
			referenceRange: {
				type: String,
				required: true,
			},
		},
	],
});

module.exports = mongoose.model('Reference', referenceSchema);
