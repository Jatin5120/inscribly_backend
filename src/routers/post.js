const express = require("express");
const { PostController } = require("../controllers/controllers");
const { PostMiddleware } = require("../middleware/middleware");

const postRouter = express.Router();

postRouter
  .route("/")
  .post(PostMiddleware.validateUpload, PostController.createPost);
postRouter
  .route("/:userId")
  .get(PostMiddleware.validateGet, PostController.getPosts);

module.exports = { postRouter };
