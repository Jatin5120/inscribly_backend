const express = require("express");
const { UploadMiddleware } = require("../middleware/middleware");
const { UploadController } = require("../controllers/controllers");

const uploadRouter = express.Router();

uploadRouter.post(
  "/",
  UploadMiddleware.singleFile,
  UploadController.uploadSingle
);

uploadRouter.post(
  "/:number",
  UploadMiddleware.multipleFiles,
  UploadController.uploadMultiple
);

module.exports = { uploadRouter };
