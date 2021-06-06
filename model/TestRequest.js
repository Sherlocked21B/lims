const mongoose = require("mongoose");
const TestRequestChild = require("./TestRequestChild");

const testRequestSchema = mongoose.Schema({
	customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
	customerName: { type: String, required: true },
	sampleId: { type: mongoose.Schema.Types.ObjectId, ref: "Sample" },
	testFee: { type: Number, required: true },
	means: { type: "String", required: true },
	sampleType: [],
	toTest: [TestRequestChild],
	animalName: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("TestRequest", testRequestSchema);
