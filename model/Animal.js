const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
	animals: [
		{
			category: {
				type: String,
				required: true,
			},
			species: [],
		},
	],
});

module.exports = mongoose.model("Animal", animalSchema);
