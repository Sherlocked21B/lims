const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const reagentSchema = new mongoose.Schema(
  {
    reagentName: {
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
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);
reagentSchema.plugin(mongoosePaginate);
const Model = mongoose.model("Reagent", reagentSchema);

module.exports = { reagentSchema: reagentSchema, Reagent: Model };
