const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");

// Clear Comment Base CRUD Contoller
/** Model Import */
const { User } = require("../models/User");
const { Cafe } = require("../models/Cafe.js");
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

  res.status(200).json({ success: true, data: comments });
});

// @desc    해당 카페리스트의 댓글 개인 댓글 조회
// @route   GET /api/cafe/:cafe_id/comment/:id
// @access  Public
exports.getComment = asyncHandler(async (req, res, next) => {
  const { cafe_id, id } = req.params;
  const cafe = await Cafe.findById(cafe_id);
  if (!cafe) {
    return next(new ErrorResponse(`${cafe_id} is not cafe data`, 404));
  }
  const comment = await Comment.findOne({ cafe: cafe_id, _id: id });
  if (comment) {
    return next(new ErrorResponse(`${id} is not comment data`, 404));
  }

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc    해당 카페리스트의 댓글 올리기
// @route   POST /api/cafe/:cafe_id/comment
// @access  Private //Admin
exports.createComment = asyncHandler(async (req, res, next) => {
  const { cafe_id } = req.params;
  const comment_data = {
    user: req.body.user,
    content: req.body.content,
    rating: req.body.rating,
    cafe: req.params.cafe_id,
  };

  // Check 수정사항 1.
  const cafe = await Cafe.findOne({ isLive: true, _id: cafe_id });
  const user = await User.findById(comment_data.user);
  let comment = await Comment.create(comment_data);
  let comment_list = await Comment.find({ cafe: cafe._id });
  const rating = comment_list.map((val) => val.rating);
  const sum = rating.reduce((a, b) => a + b);
  const avg = sum / comment_list.length;
  await Cafe.updateOne({ _id: cafe_id }, { averageRating: avg }, { new: true });

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc    해당 카페리스트의 댓글 업데이트
// @route   PUT /api/cafe/:cafe_id/comment/:id
// @access  Private //Admin
exports.updateComment = asyncHandler(async (req, res, next) => {
  const { id, cafe_id } = req.params;
  const { content, rating } = req.body;

  comments = await Comment.findOneAndUpdate(
    { _id: id },
    { content, rating },
    { new: true }
  );

  let comment_list = await Comment.find({ cafe: cafe_id });
  const ratings = comment_list.map((val) => val.rating);
  const sum = ratings.reduce((a, b) => a + b);
  const avg = sum / comment_list.length;
  await Cafe.updateOne({ _id: cafe_id }, { averageRating: avg }, { new: true });

  res.status(200).json({
    success: true,
    data: comments,
  });
});

// @desc    해당 카페리스트의 댓글 삭제
// @route   DELETE /api/cafe/:cafe_id/comment/:id
// @access  Private //Admin

exports.deleteCafe = asyncHandler(async (req, res, next) => {
  const { comment_id } = req.params;
  const comment = await Comment.findOneAndDelete({ _id: comment_id });

  // const ratings = comment_list.map((val) => val.rating);
  // const sum = ratings.reduce((a, b) => a + b);
  // const avg = sum / comment_list.length;
  // await Cafe.updateOne({ cafe: cafe_id }, { averageRating: avg });
  res.status(204).json({
    success: true,
  });
});
