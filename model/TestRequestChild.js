const mongoose = require('mongoose');
//comment test

const testRequestChildSchema = new mongoose.Schema({
	testName: {
		type: String,
		required: true,
	},
	testParameters: [String],
});

module.exports = testRequestChildSchema;
