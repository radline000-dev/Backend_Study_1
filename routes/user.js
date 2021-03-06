const express = require("express");
// Clear Base User routes
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const Router = express.Router();
Router.route("/").get(getUsers).post(createUser);
Router.route("/:user_id").get(getUser).put(updateUser).delete(deleteUser);
module.exports = Router;
