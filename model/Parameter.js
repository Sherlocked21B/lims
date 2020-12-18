const mongoose = require('mongoose');

const parameterSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	unit: {
		type: String,
		required: true,
	},
	reference: {
		type: String,
		required: true,
	},
});

module.exports = parameterSchema;
