const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err.name.red);

  //Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource Not Found`;
    error = new ErrorResponse(message, 400);
  }
  //Mongoose Duplication Key
  if (err.code === 11000) {
    const message = `Duplication field value entered`;
    error = new ErrorResponse(message, 400);
  }
  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
