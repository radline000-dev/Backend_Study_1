const mongoose = require("mongoose");

// Working Comment Models Define
const CommentSchema = new mongoose.Schema({}, { timestamps });

const Comment = mongoose.model("comment", CommentSchema);
module.exports = { Comment, CommentSchema };
