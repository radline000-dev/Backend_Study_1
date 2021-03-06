const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");

// Clear USER Base CRUD Contoller
/** User Model Import */
const { User } = require("../models/User");

// @desc    모든 유저 조회
// @route   GET /api/user/
// @access  Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  const check = {};
  console.log(!users.length);
  if (!users.length) {
    return next(new ErrorResponse("Users Data Not found", 404));
  }
  return res.status(200).json({
    success: true,
    users,
  });
});

// @desc    유저 조회
// @route   GET /api/user/:user_id
// @access  Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;

  const user = await User.findById(user_id);

  if (!user) {
    return next(new ErrorResponse("User Data Not found ", 404));
  }
  return res.status(200).json({
    success: true,
    user,
  });
});

// @desc    유저 생성
// @route   POST /api/user/
// @access  Public
exports.createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await User.create({ username, email, password });

  if (!user) {
    return next(new ErrorResponse("User Not Create ", 400));
  }
  // const user = new User({username,email,password});
  // await user.save();

  return res.status(200).json({
    success: true,
    user,
  });
});

// @desc    유저 갱신
// @route   Put /api/user/:user_id
// @access  Private / Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;
  const { username, password } = req.body;

  let updateData = {};
  if (!username && !password) {
    return next(
      new ErrorResponse("User Name is require or password required ", 400)
    );
  }

  if (
    (username && typeof username.first !== "string") ||
    typeof username.last !== "string"
  ) {
    return next(
      new ErrorResponse(
        "User Name is require and username.fist must be string ,last must be string ",
        400
      )
    );
  }

  if (password && typeof password !== "string") {
    return next(
      new ErrorResponse("Password is require and password = string ", 400)
    );
  }
  if (password) {
    updateData.password = password;
  }
  if (username) {
    updateData.username = username;
  }

  const user = await User.findByIdAndUpdate(
    { _id: user_id },
    { updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    success: true,
    user,
  });
});

// @desc    유저 삭제
// @route   Delete /api/user/:user_id
// @access  Private // Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;

  await User.findByIdAndDelete({ _id: user_id });

  return res.status(200).json({
    success: true,
  });
});
