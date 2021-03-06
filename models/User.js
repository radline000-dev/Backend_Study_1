const mongoose = require("mongoose");

// Clear  User Models Define

const UserSchema = new mongoose.Schema(
  {
    username: {
      first: {
        type: String,
        required: [true, "first name required "],
      },
      last: {
        type: String,
        required: [true, "last name required"],
      },
    },
    email: {
      type: String,
      required: [true, "email is required "],
      match: [
        /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
        "email is not validation",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password min length 6 "],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
module.exports = { User, UserSchema };
