const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");

// Clear Comment Base CRUD Contoller
/** Model Import */
const { User } = require("../models/User");
const { Cafe } = requrie("../models/Cafe.js");
const { Comment } = require("../models/Comment");

// @desc    해당 카페리스트의 전체 댓글 조회
// @route   GET /api/cafe/:cafe_id/comment
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
  const { cafe_id } = req.params;
  const cafe = await Cafe.findById(cafe_id);
  if (!cafe) return next(new ErrorResponse("Cafe Data is Not found ", 404));
  const comments = await Comment.find({ cafe: cafe._id });

  if (!comments.length) {
    return next(new ErrorResponse(`${cafe._id} is Not Found Comments`, 404));
  }
});

// @desc    해당 카페리스트의 댓글 개인 댓글 조회
// @route   GET /api/user/
// @access  Private //Admin

// @desc    해당 카페리스트의 댓글 올리기
// @route   POST /api/user/
// @access  Private //Admin

// @desc    해당 카페리스트의 댓글 업데이트
// @route   PUT /api/user/
// @access  Private //Admin

// @desc    해당 카페리스트의 댓글 삭제
// @route   DELETE /api/user/
// @access  Private //Admin
