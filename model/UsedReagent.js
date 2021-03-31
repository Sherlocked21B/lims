const mongoose = require("mongoose");

const usedReagentSchema = new mongoose.Schema(
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
			type: Number,
			required: true,
		},
		sampleNo: {
			type: String,
			required: true,
		},
		sampleId: { type: mongoose.Schema.Types.ObjectId, ref: "Sample" },
		reagentId: { type: mongoose.Schema.Types.ObjectId, ref: "Reagent" },
	},
	{ timestamps: { createdAt: "createdAt", updatedAt: false } },
);

module.exports = mongoose.model("UsedReagent", usedReagentSchema);
