const express = require("express");
const { AuthController } = require("../controllers/controllers");
const { AuthMiddleware } = require("../middleware/auth");

const authRouter = express.Router();

authRouter
  .route("/login")
  .post(AuthMiddleware.validateLoginType, AuthController.login);

authRouter.route("/register").post(AuthController.register);

module.exports.authRouter = authRouter;
