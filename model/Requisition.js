const mongoose = require("mongoose");

const requisitionSchema = new mongoose.Schema({
	request: [
		{
			name: String,
			unit: String,
			quantity: Number,
		},
	],
	createdAt: {
		type: Date,
		default: new Date(new Date().toISOString().substring(0, 10)).toISOString(),
	},
});

module.exports = mongoose.model("Requisition", requisitionSchema);
