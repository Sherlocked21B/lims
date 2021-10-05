const mongoose = require("mongoose");

const reagentUsageSchema = new mongoose.Schema({
	testName: {
		type: String,
		required: true,
	},
	parameter: {
		type: String,
		required: true,
	},
	reagentTable: [
		{
			reagentName: {
				type: String,
				required: true,
			},
			unit: {
				type: String,
				required: true,
			},
			volume: {
				type: String,
				required: true,
			},
		},
	],
});

module.exports = mongoose.model("ReagentUsage", reagentUsageSchema);
