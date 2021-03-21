const mongoose = require('mongoose');

const parameterSchema = new mongoose.Schema({
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
});

module.exports = parameterSchema;
