const mongoose = require("mongoose");

const sampleSchema = new mongoose.Schema({
  sampleNo: {
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
    type: Number,
    required: true,
  },
  testName: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
});

module.exports = mongoose.model("Sample", sampleSchema);
