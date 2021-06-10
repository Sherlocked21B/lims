const mongoose = require("mongoose");

const statementSchema = new mongoose.Schema(
	{
		customerName: {
			type: String,
			required: true,
		},
		petName: {
			type: String,
			required: true,
		},
		sampleNo: { type: String, required: true },
		amount: { type: Number, required: true },
		sampleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sample' },
	},
	{
		timestamps: true,
	},
);
module.exports = mongoose.model("Statement", statementSchema);
