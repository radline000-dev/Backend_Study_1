const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`.blue.bold);
  if (process.env.NODE_ENV === "development") {
    mongoose.set("debug", true);
  }
};

module.exports = connectDB;
