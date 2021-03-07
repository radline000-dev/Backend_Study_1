const mongoose = require("mongoose");

// Clear Cafe Models Define
const CafeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is require "],
      unique: true,
    },
    content: {
      type: String,
      required: [true, "content is require"],
    },
    isLive: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    tag: {
      type: [String],
    },
    averageRating: {
      type: Number,
      min: [0, "Rating must be at least 1"],
      max: [10, "Rating must can not be more than 10"],
      default: 0.0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    images: {
      type: String,
    },
  },
  { timestamps: true }
);

const Cafe = mongoose.model("cafe", CafeSchema);
module.exports = { Cafe, CafeSchema };
