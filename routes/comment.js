const express = require("express");
const { getComments, createComment } = require("../controllers/comment");

const Router = express.Router({ mergeParams: true });
Router.route("/").get(getComments).post(createComment);
module.exports = Router;
