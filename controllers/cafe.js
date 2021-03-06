const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const path = require("path");
// Clear Cafe Base CRUD Contoller
/** Cafe Model Import */
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
  let { title, content, isLive, tag, user_id, images } = req.body;
  tag = JSON.parse(tag);
  const user = await User.findById(user_id);
  if (!user) {
    return next(new ErrorResponse(`${user_id} is Not User _id `, 400));
  }

  //Create
  console.log(req.files.file);
  //Tesing images => file 파일 images
  if (req.files) {
    const file = req.files.file; //(Multer single)
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse("File must be images", 400));
    }
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(`image less than ${process.env.MAX_FILE_UPLOAD}`, 400)
      );
    }
    images = `cafe_image_${Date.now()}_${user_id}${path.parse(file.name).ext}`;
  }

  const createData = {
    title,
    content,
    isLive,
    tag,
    user: user._id,
    images,
  };

  let cafe = await Cafe.create(createData);

  if (cafe && req.files) {
    const file = req.files.file;
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${images}`, async (error) => {
      if (error) {
        //images 업데이트 로직이 필요
        cafe.images = "";
        await cafe.save();
        return next(`Problem with file upload `, 500);
      }
    });
  }

  res.status(201).json({
    success: true,
    cafe,
  });
});

// @desc    카페 갱신
// @route   patch /api/cafe/:cafe_id
// @access  Private / Admin
exports.updateCafe = asyncHandler(async (req, res, next) => {
  const { cafe_id } = req.params;
  const cafe = await Cafe.findById(cafe_id);
  if (!cafe) {
    return next(new ErrorResponse("Cafe Data Not found ", 404));
  }
  cafe.isLive = !cafe.isLive;
  await cafe.save();

  res.status(200).json({
    success: true,
  });
});

// @desc    카페 삭제
// @route   Delete /api/cafe/:cafe_id
// @access  Private // Admin
exports.deleteCafe = asyncHandler(async (req, res, next) => {
  const { cafe_id } = req.params;
  await Cafe.findByIdAndDelete(cafe_id);

  res.status(200).json({
    success: true,
  });
});
