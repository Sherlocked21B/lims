const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const sampleSchema = new mongoose.Schema(
	{
		sampleNo: {
			type: String,
			required: true,
		},
		samplingDate: {
			type: Date,
			required: true,
		},
		created_at: {
			type: Date,
			default: new Date(
				new Date().toISOString().substring(0, 10)
			).toISOString(),
		},
		sampleSubmittedBy: {
			type: String,
			required: true,
		},
		petName: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		animal: {
			type: String,
			required: true,
		},
		breed: {
			type: String,
			required: true,
		},
		petOwner: {
			type: Number,
			default:"",
		},
		gender: {
			type: String,
			required: true,
		},
		status: {
			type: Boolean,
			default: false,
		},
		customerName: {
			type: String,
			required: true,
		},
		customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
	},
	{ timestamps: true }
);

sampleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Sample', sampleSchema);
