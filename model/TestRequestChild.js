const mongoose = require("mongoose");
//comment test

const testRequestChildSchema = new mongoose.Schema({
	package: {
		type: String,
		required: true,
	},
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Test",
		required: true,
	},
	testChecked: {
		type: Boolean,
		required: true,
	},
	checkedAll: {
		type: Boolean,
		required: true,
	},
	testName: {
		type: String,
		required: true,
	},
	parameter: [],
});

module.exports = testRequestChildSchema;
