const mongoose = require("mongoose");

// Clear Comment Models Define
const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: [true, "user_id is require"],
    },
    content: {
      type: String,
      minlength: [10, "content more than 10 length"],
      required: [true, "content is require"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: [true, "Plase add a rating between 1 and 10"],
    },
    cafe: {
      type: mongoose.Schema.ObjectId,
      ref: "cafe",
      required: [true, "Plase add a cafe _id "],
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", CommentSchema);
module.exports = { Comment, CommentSchema };
