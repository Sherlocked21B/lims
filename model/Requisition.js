const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const requisitionSchema = new mongoose.Schema({
	request: [
		{
			name: String,
			unit: String,
			quantity: Number,
		},
	],
});
requisitionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Requisition', requisitionSchema);
