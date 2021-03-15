const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  result: [
    {
      name: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        default: 0,
      },
      reference: {
        type: String,
        required: true,
      },
    },
  ],
  sampleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sample",
    required: true,
  },
});

module.exports = mongoose.model("Result", resultSchema);
