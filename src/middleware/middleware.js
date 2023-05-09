const { UploadMiddleware } = require("./upload");
const { AuthMiddleware } = require("./auth");
const { PostMiddleware } = require("./post");

module.exports = { UploadMiddleware, AuthMiddleware, PostMiddleware };
