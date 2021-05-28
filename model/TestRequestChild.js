const mongoose = require("mongoose");
//comment test

const testRequestChildSchema = new mongoose.Schema({
	testName: {
		type: String,
		required: true,
	},
	testParameters: [],
});

module.exports = testRequestChildSchema;
