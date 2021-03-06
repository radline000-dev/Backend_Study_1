const express = require("express");
const {
  createCafe,
  getCafes,
  getCafe,
  deleteCafe,
  updateCafe,
} = require("../controllers/cafe");
const comment = require("./comment");

const Router = express.Router();
Router.use("/:cafe_id/comment", comment);

Router.route("/").post(createCafe).get(getCafes);
Router.route("/:cafe_id").get(getCafe).patch(updateCafe).delete(deleteCafe);

module.exports = Router;
