const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		// required: true,
	},
	email: {
		type: String,
		// required: true,
	},
	address: {
		type: String,
		// required: true,
	},
	gender: {
		type: String,
		// required: true,
	},
	contactNumber: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Customer", customerSchema);
