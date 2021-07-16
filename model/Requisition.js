const mongoose = require('mongoose');

const requisitionSchema = new mongoose.Schema({
	request: [
		{
			name: String,
			unit: String,
			quantity: Number,
		},
	],
});

module.exports = mongoose.model('Requisition', requisitionSchema);
