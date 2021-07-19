const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const requisitionSchema = new mongoose.Schema(
	{
		request: [
			{
				name: String,
				unit: String,
				quantity: Number,
			},
		],
		created_at: {
			type: Date,
			default: new Date(
				new Date().toISOString().substring(0, 10),
			).toISOString(),
		},
	},
	{ timestamps: true },
);
requisitionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Requisition", requisitionSchema);
