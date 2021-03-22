const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
  customerName: {
    type: String,
    required: true,
  },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
});

sampleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Sample", sampleSchema);
