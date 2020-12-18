const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	fee: {
		type: Number,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	test: [String],
	sample: [String],
});

module.exports = mongoose.model('Customer', customerSchema);
