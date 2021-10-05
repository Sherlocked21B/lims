const mongoose = require("mongoose");

const usedReagentSchema = new mongoose.Schema(
	{
		sampleNo: {
			type: String,
			required: true,
		},
		sampleId: { type: mongoose.Schema.Types.ObjectId, ref: "Sample" },
		usedReagent: [],
	},
	{ timestamps: { createdAt: "createdAt", updatedAt: false } },
);

module.exports = mongoose.model("UsedReagent", usedReagentSchema);
