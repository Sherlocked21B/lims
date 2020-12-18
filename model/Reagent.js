const mongoose = require('mongoose');

const reagentSchema = new mongoose.Schema({
	name: {
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
});

const Model = mongoose.model('Reagent', reagentSchema);

module.exports = { reagentSchema: reagentSchema, Reagent: Model };
