const mongoose = require("mongoose");

// Working Cafe Models Define
const CafeSchema = new mongoose.Schema({
  title:{
    type:String,
    required: [true,"title is require "],
    unique:true
  },
  content:{
    type:String,
    required:[true,"content is require"];
  }
}, { timestamps:true });

const Cafe = mongoose.model("cafe", CafeSchema);
module.exports = { Cafe, CafeSchema };
