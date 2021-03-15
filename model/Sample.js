const mongoose = require("mongoose");
const { reagentSchema } = require("./Reagent");

const sampleSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  collectedBy: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: Boolean,
    required: true,
  },
  testName: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  reagent: [reagentSchema],
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
});

module.exports = mongoose.model("Sample", sampleSchema);
