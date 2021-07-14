const mongoose = require("mongoose");

const methodSchema = new mongoose.Schema({
	methodName: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Method", methodSchema);
