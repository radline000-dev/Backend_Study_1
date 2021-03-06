"use strict";

var ErrorResponse = require("../utils/ErrorResponse");

var asyncHandler = require("../middleware/async"); // Clear USER Base CRUD Contoller

/** User Model Import */


var _require = require("../models/User"),
    User = _require.User; // @desc    모든 유저 조회
// @route   GET /api/user/
// @access  Public


exports.getUsers = asyncHandler(function _callee(req, res, next) {
  var users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.find());

        case 2:
          users = _context.sent;

          if (users.length) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", next(new ErrorResponse("Users Data Not found", 404)));

        case 5:
          res.status(200).json({
            success: true,
            users: users
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}); // @desc    유저 조회
// @route   GET /api/user/:user_id
// @access  Public

exports.getUser = asyncHandler(function _callee2(req, res, next) {
  var user_id, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user_id = req.params.user_id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findById(user_id));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", next(new ErrorResponse("User Data Not found ", 404)));

        case 6:
          res.status(200).json({
            success: true,
            user: user
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // @desc    유저 생성
// @route   POST /api/user/
// @access  Public

exports.createUser = asyncHandler(function _callee3(req, res, next) {
  var _req$body, username, email, password, user;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.create({
            username: username,
            email: email,
            password: password
          }));

        case 3:
          user = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            success: true,
            user: user
          }));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // @desc    유저 갱신
// @route   Put /api/user/:user_id
// @access  Private / Admin

exports.updateUser = asyncHandler(function _callee4(req, res, next) {
  var user_id, _req$body2, username, password, updateData, user;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user_id = req.params.user_id;
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          updateData = {};

          if (!(!username && !password)) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", next(new ErrorResponse("User Name is require or password required ", 400)));

        case 5:
          if (!(username && typeof username.first !== "string" || typeof username.last !== "string")) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", next(new ErrorResponse("User Name is require and username.fist must be string ,last must be string ", 400)));

        case 7:
          if (!(password && typeof password !== "string")) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", next(new ErrorResponse("Password is require and password = string ", 400)));

        case 9:
          if (password) {
            updateData.password = password;
          }

          if (username) {
            updateData.username = username;
          }

          _context4.next = 13;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate({
            _id: user_id
          }, {
            updateData: updateData
          }, {
            "new": true,
            runValidators: true
          }));

        case 13:
          user = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            success: true,
            user: user
          }));

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // @desc    유저 삭제
// @route   Delete /api/user/:user_id
// @access  Private // Admin

exports.deleteUser = asyncHandler(function _callee5(req, res, next) {
  var user_id;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          user_id = req.params.user_id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.findByIdAndDelete({
            _id: user_id
          }));

        case 3:
          return _context5.abrupt("return", res.status(200).json({
            success: true
          }));

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});