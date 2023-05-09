const { AuthController } = require("./auth");
const { UserController } = require("./user");
const { UploadController } = require("./upload");
const { DatabaseController } = require("./database");
const { PostController } = require("./post");
const { TagController } = require("./tag");

module.exports = {
  AuthController,
  UserController,
  DatabaseController,
  UploadController,
  PostController,
  TagController,
};
