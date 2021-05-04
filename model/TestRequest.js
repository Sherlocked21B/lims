const mongoose = require('mongoose');
const TestRequestChild = require('./TestRequestChild');

const testRequestSchema = mongoose.Schema({
	sampleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sample' },
	testFee: { type: Number, required: true },
	means: { type: 'String', required: true },
	sampleType: [String],
	toTest: [TestRequestChild],
});

module.exports = mongoose.model('TestRequest', testRequestSchema);
