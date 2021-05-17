const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const parameter = require('./Parameter');

const testSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	parameter: [parameter],
});
testSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Test', testSchema);
