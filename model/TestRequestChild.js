const mongoose = require('mongoose');

const testRequestChildSchema = new mongoose.Schema({
	testName: {
		type: String,
		required: true,
	},
	testParameters: [String],
});

module.exports = testRequestChildSchema;
