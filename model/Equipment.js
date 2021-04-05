const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const equipmentSchema = new mongoose.Schema(
	{
		equipmentName: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: { createdAt: "createdAt", updatedAt: false } },
);
equipmentSchema.plugin(mongoosePaginate);
const Model = mongoose.model("Equipment", equipmentSchema);

module.exports = { equipmentSchema: equipmentSchema, Equipment: Model };
