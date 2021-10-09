const mongoose = require("mongoose");
const journeySchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    startLocation: {
      type: String,
    },
    endLocation: {
      type: String,
    },
    experience: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
journeySchema.virtual("posts", {
  ref: "post",
  localField: "_id",
  foreignField: "journeyId",
});
const Journey = mongoose.model("journey", journeySchema);
module.exports = Journey;
