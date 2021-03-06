const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");

// Working Cafe Base CRUD Contoller
/** User Model Import */
const { Cafe } = require("../models/Cafe");

// @desc    모든 카페 조회
// @route   GET /api/cafe/
// @access  Public
exports.getCafes = asyncHandler(async (req, res, next) => {
  const cafes = await Cafe.find();

  if (!cafes.length) {
    return next(new ErrorResponse("Cafes Data Not found ", 404));
  }
  return res.status(200).json({
    success: true,
    Cafes,
  });
});

// @desc    카페 조회
// @route   GET /api/cafe/:cafe_id
// @access  Public
exports.getCafe = asyncHandler(async (req, res, next) => {
  const { cafe_id } = req.params;
  const cafe = await Cafe.findById(cafe_id);

  if (!cafe) {
    return next(new ErrorResponse("Cafe Data Not found ", 404));
  }

  return res.status(200).json({
    success: true,
    cafe,
  });
});

// @desc    카페 생성
// @route   POST /api/cafe/
// @access  Private // Admin
exports.createCafe = asyncHandler(async (req, res, next) => {
  const { title, content, isLive, tag } = req.body;

  const cafe = await Cafe.create({ username, email, password });

  if (!cafe) {
    return next(new ErrorResponse("User Not Create ", 400));
  }
  // const cafe = new User({username,email,password});
  // await cafe.save();

  return res.status(200).json({
    success: true,
    cafe,
  });
});

// @desc    카페 갱신
// @route   Put /api/cafe/:user_id
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

  const cafe = await User.findByIdAndUpdate(
    { _id: user_id },
    { updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    success: true,
    cafe,
  });
});

// @desc    카페 삭제
// @route   Delete /api/cafe/:user_id
// @access  Private // Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { user_id } = req.params;

  await User.findByIdAndDelete({ _id: user_id });

  return res.status(200).json({
    success: true,
  });
});
